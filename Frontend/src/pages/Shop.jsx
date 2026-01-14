import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../redux/api/categoriesApiSlice";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { setCategories, setChecked, setProducts } from "../redux/features/shop/shopSlice";
import Loader from '../components/Loader'
import ProductCards from "./Products/ProductCards";



const Shop = () => {

    const { categories, products, checked, radio } = useSelector((state) => state.shop)
    const dispatch = useDispatch()

    const { data: categoriesQuery, isLoading: loadingCategories } = useGetAllCategoriesQuery()
    const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio })

    const [priceFilter, setPriceFilter] = useState('')

    useEffect(() => {
        if (!loadingCategories) {
            dispatch(setCategories(categoriesQuery))
        }
    }, [categoriesQuery, dispatch])

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                const filteredProducts = filteredProductsQuery.data?.filter((product) => {
                    //check if price filter is present in product price
                    return (
                        product.price.toString().includes(priceFilter) ||
                        product.price === parseInt(priceFilter, 10)
                    )
                })

                dispatch(setProducts(filteredProducts))
            }
        }
    }, [checked, radio, filteredProductsQuery.data, priceFilter, dispatch])

    const checkedHandler = (value, id) => {
        const updateChecked = value ? [...checked, id] :
            checked.filter((c) => c !== id)
        dispatch(setChecked(updateChecked))

    }

    const handleBrands = (brand) => {
        const filterProductByBrand = filteredProductsQuery.data?.filter((product) => product.brand === brand)
        dispatch(setProducts(filterProductByBrand))
        console.log('filtered products by brand are ', filterProductByBrand);

    }

    const handlePrice = (e) => {
        setPriceFilter(e.target.value)
    }

    const uniqBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data?.map((product) => product.brand).filter((brand) => brand !== undefined)
            )
        )
    ]

    return (
        <>
            <div className="container mx-auto px-4 md:ml-[4rem] pt-14">
                <div className="flex flex-col md:flex-row">
                    <div className="p-3 mt-2 bg-gray-300 mb-2 rounded">
                        <h1 className="h4 text-white text-center text-bold py-2 bg-black rounded-full mb-2 pl-3 pr-3">
                            Filter by Categories
                        </h1>

                        <div className="p-5 w-full md:w-[15rem]">
                            {categoriesQuery?.map((category) => (
                                <div key={category._id} className="mb-2">
                                    <div className="flex items-center mr-4">
                                        <input type="checkbox" id='selectCategory'
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
                                        rounded focus:ring-blue-500 dark:focus:ring-blue-600 
                                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                                        dark:border-gray-600"
                                            onChange={(e) => checkedHandler(e.target.checked, category._id)} />
                                        <label htmlFor="text-category"
                                            className="ml-2 text-sm font-medium text-black dark:text-black" >
                                            {category.name}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-white text-center py-2 bg-black rounded-full mb-2">
                            Filter by brand
                        </h2>

                        <div className="p-5">
                            {uniqBrands.map((brand) => (
                                <div>
                                    <div className="flex items-enter mr-4 mb-5">
                                        <input type="radio"
                                            id={brand}
                                            name="brand"
                                            className="w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 focus:ring-blue-500 
                                        dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                                        dark:border-gray-600"
                                            onChange={() => handleBrands(brand)} />
                                        <label htmlFor="brand"
                                            className="ml-2 text-sm font-medium text-black dark:text-black">
                                            {brand}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="h4 text-white text-center py-2 bg-black rounded-full mb-2">
                            Filter by price
                        </h2>

                        <div className="p-5 w-full md:w-[15rem]">
                            <input type="text" placeholder="Enter price" value={priceFilter}
                                onChange={handlePrice}
                                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg 
                                focus:outline-none focus:ring focus:border-blue-500"/>
                        </div>

                        <div className=" flex justify-center item-center p-5 pt-0  text-white">
                            <button className="w-[5rem] border my-4 bg-black rounded-full hover:bg-white hover:text-black"
                                onClick={() => window.location.reload()}>
                                reset
                            </button>
                        </div>
                    </div>

                    <div className="p-3">
                        <h2 className="h4 text-center mb-2">
                            {products?.length} Products
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.length === 0 ?
                                (
                                    <Loader />
                                ) : (
                                    products.map((p) => (
                                        <div className="bg-[#1A1A1A] rounded-lg shadow-md dark:bg-gray-800 
                                    dark:border-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
                                            style={{ minHeight: "400px", maxWidth: "100%" }} key={p._id}>
                                            <ProductCards product={p} />
                                        </div>
                                    ))
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
