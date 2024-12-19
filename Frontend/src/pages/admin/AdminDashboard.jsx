import React, { useEffect, useState } from 'react';
import { useGetUsersQuery } from '../../redux/api/usersApiSlice';
import { useGetOrderCountQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from '../../redux/api/orderApiSlice';
import Chart from "react-apexcharts";
import Orderlist from './OrderList';
import Loader from '../../components/Loader';
import AdminMenu from './AdminMenu';
import { BiDollar } from 'react-icons/bi';
import { MdGroup } from 'react-icons/md';
import { FaReceipt } from 'react-icons/fa';

const AdminDashboard = () => {
    const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
    const { data: totalOrders, isLoading: loadingOrders } = useGetOrderCountQuery();
    const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
        options: {
            chart: { type: "area" },
            tooltip: { theme: "dark" },
            colors: ["#00E396"],
            dataLabels: { enabled: true },
            stroke: { curve: "smooth" },
            title: { text: "Sales Trend", align: "left" },
            grid: { borderColor: "#ccc" },
            markers: { size: 3 },
            xaxis: { categories: [], title: { text: "Date" } },
            yaxis: { title: { text: "Sales" }, min: 0 },
            legend: { position: "top", horizontalAlign: "right", floating: true, offsetY: -25, offsetX: -5 },
        },
        series: [{ name: "Sales", data: [] }],
    });

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },
                series: [{ name: "Sales", data: formattedSalesDate.map((item) => item.y) }],
            }));
        }
    }, [salesDetail]);

    return (
        <>
            <AdminMenu />

            <section className="container mx-auto px-4 xl:px-20 mt-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-white p-3 rounded-full mb-4">
                            <BiDollar size={24} color="gray" />
                        </div>
                        <p className="text-lg font-medium">Sales</p>
                        <h1 className="text-3xl font-semibold">
                            $ {loadingSales ? <Loader /> : sales?.toFixed(2)}
                        </h1>
                    </div>

                    <div className="rounded-lg bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-white p-3 rounded-full mb-4">
                            <MdGroup size={24} color="gray" />
                        </div>
                        <p className="text-lg font-medium">Customers</p>
                        <h1 className="text-3xl font-semibold">
                            {loadingUsers ? <Loader /> : users?.length}
                        </h1>
                    </div>

                    <div className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-white p-3 rounded-full mb-4">
                            <FaReceipt size={24} color="gray" />
                        </div>
                        <p className="text-lg font-medium">All Orders</p>
                        <h1 className="text-3xl font-semibold">
                            {loadingOrders ? <Loader /> : totalOrders?.orderCount}
                        </h1>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="w-full md:w-4/5 xl:w-3/4">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="bar"
                            width="100%"
                        />
                    </div>
                </div>

                {/* <div className="mt-12">
                    <Orderlist />
                </div> */}
            </section>
        </>
    );
}

export default AdminDashboard;
