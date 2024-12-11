import { PAYPAL_URL, ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder : builder.mutation({
            query: (data) => ({
                url: `${ORDER_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        getAllOrder: builder.query({
            query: () => ({
                url: `${ORDER_URL}`,
            }),
        }),

        getUserOrder: builder.query({
            query: () => ({
                url: `${ORDER_URL}/my-orders`
            }),
            keepUnusedDataFor: 5,
        }),

        getOrderCount: builder.query({
            query: () => ({
                url: `${ORDER_URL}/orderCount`,
            }),
        }),

        getTotalSales: builder.query({
            query: () => ({
                url: `${ORDER_URL}/totalSales`
            }),
        }),

        payPalClientId: builder.query({
            query: () => ({
                url: `${PAYPAL_URL}`
            }),
        }),

        deliverOrder: builder.mutation({
            query: (id, data) => ({
                url: `${ORDER_URL}/${id}/deliver`,
                method: 'PUT',
                body: data,
            }),
        }),

        getTotalSalesByDate: builder.query({
            query: () => ({
                url: `${ORDER_URL}/totalSalesByDate`,
            }),
        }),

        getOrderDetails: builder.query({
            query: (id) => ({
              url: `${ORDER_URL}/${id}`,
            }),
          }),

          cancelOrder: builder.mutation({
            query: (id) => ({
                url: `${ORDER_URL}/${id}`,
                method: 'DELETE',
            }),
          }),

        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
              url: `${ORDER_URL}/${orderId}/payed`,
              method: "PUT",
              body: details,
            }),
          }),
    })
})


export const {
    useCreateOrderMutation,
    useGetAllOrderQuery,
    useGetUserOrderQuery,
    useGetOrderCountQuery,
    useDeliverOrderMutation,
    useGetTotalSalesQuery,
    usePayPalClientIdQuery,
    useGetTotalSalesByDateQuery,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useCancelOrderMutation
} = orderApiSlice;
