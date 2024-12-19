import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useUploadProductImaageMutation } from '../../redux/api/productApiSlice';
import { useGetAllCategoriesQuery } from '../../redux/api/categoriesApiSlice';
import { useNavigate } from "react-router-dom";
import AdminMenu from './AdminMenu';


const ProductList = () => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockCount, setStockCount] = useState(0);
    const [imageURL, setImageURL] = useState('')
    const [category, setCategory] = useState('');

    const navigate = useNavigate();

    const [createProduct] = useCreateProductMutation();
    const [uploadImage] = useUploadProductImaageMutation();
    const {data: categories} = useGetAllCategoriesQuery();

    const uploadFileHandler = async (e) => {

        // const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        //     if (!allowedTypes.includes(file.type)) {
        //         toast.error('Only JPEG and PNG images are allowed.');
        //         return;
        //     }

        //     if (file.size > 5 * 1024 * 1024) { // 5MB limit
        //         toast.error('File size exceeds 5MB.');
        //         return;
        //     }
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message); 
    
            setImage(res.image); 
            setImageURL(res.image);
    
        } catch (error) {
            toast.error(error?.data?.message || 'Error uploading image.');
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        switch (true) {
            case !name:
                toast.error('Enter product name')
                break;
            case !price:
                toast.error('Enter product price')
                break;
            case !brand:
                toast.error('Enter product brand')
                break;
            case !quantity:
                toast.error('Enter the quantity of product')
                break;
            case !description:
                toast.error('Enter a short description for your product')
                break;
            case !stockCount:
                toast.error('Enter the stock')
                break;
            case !category:
                toast.error('Specify the category of product')
                break;
            default:
                break;
        }

        const productData = new FormData();
    productData.append("name", name);
    productData.append("brand", brand);
    productData.append("description", description);
    productData.append("quantity", quantity);
    productData.append("price", price);
    productData.append("category", category);
    productData.append('stockCount', stockCount);
    if (image) productData.append("image", image);

    console.log(productData.name);
    

        try {
            const res = await createProduct(productData).unwrap();
            
            if (res) {
                toast.success(`${productData.name} successfully created`);
                navigate('/');
            } else {
                toast.error('failed to create the product')
            }
            
            
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    } 

    return (
        <div className="container mx-auto xl:px-24 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <AdminMenu />
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Create Product</h1>
                
                {/* Image Upload Section */}
                <div className="mb-6">
                    {imageURL && (
                        <div className="text-center mb-4">
                            <img
                                src={imageURL}
                                alt="Product Preview"
                                className="inline-block max-h-48 rounded-md shadow-md"
                            />
                        </div>
                    )}
                    <label className="block w-full text-center border-2 border-dashed rounded-lg py-6 cursor-pointer text-gray-600 hover:bg-gray-50">
                        {image ? image.name : "Click to Upload Image"}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={uploadFileHandler}
                        />
                    </label>
                </div>
    
                {/* Form Section */}
                <form className="space-y-6">
                    {/* Name and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-600">Price</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                    </div>
    
                    {/* Brand and Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-600">Brand</label>
                            <input
                                type="text"
                                id="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                    </div>
    
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                        ></textarea>
                    </div>
    
                    {/* Stock Count and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="stockCount" className="block text-sm font-medium text-gray-600">Count in Stock</label>
                            <input
                                type="number"
                                id="stockCount"
                                value={stockCount}
                                onChange={(e) => setStockCount(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-600">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
    
                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={submitHandler}
                            className="px-6 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 font-bold focus:ring focus:ring-blue-300 focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductList;
