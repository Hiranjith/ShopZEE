import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteProductMutation, 
    useGetProductByIdQuery, 
    useUpdateProductMutation, 
    useUploadProductImaageMutation } from '../../redux/api/productApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import { useGetAllCategoriesQuery } from '../../redux/api/categoriesApiSlice';


const UpdateProduct = () => {
    const params = useParams();
    
    const {data: productData} = useGetProductByIdQuery(params.id);
    
    const {data : categories = []} = useGetAllCategoriesQuery();
    const [updateImage] = useUploadProductImaageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const [name, setName] = useState(productData?.name || '');
    const [image, setImage] = useState(productData?.image || '');
    const [brand, setBrand] = useState(productData?.brand || '');
    const [quantity, setQuantity] = useState(productData?.quantity || '');
    const [description, setDescription] = useState(productData?.description || '');
    const [price, setPrice] = useState(productData?.price || '');
    const [stockCount, setStockCount] = useState(productData?.stockCount || 0);
    const [category, setCategory] = useState(productData?.category || '');

    const navigate = useNavigate();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setImage(productData.image);
            setBrand(productData.brand);
            setQuantity(productData.quantity);
            setDescription(productData.description);
            setPrice(productData.price);
            setStockCount(productData.stockCount);
            setCategory(productData.category);
        }
    }, [productData])

    const uploadFileHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await updateImage(formData).unwrap();
            if (res) {
                toast.success('Image updated successfully');
                setImage(res.image); 

            } else {
                toast.error('image upload failed');
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("description", description);
            formData.append("quantity", quantity);
            formData.append("price", price);
            formData.append("category", category);
            formData.append('stockCount', stockCount);
            formData.append("image", image);
            console.log(formData);
            

        try {
            

            const res = await updateProduct({productId: params.id, formData}).unwrap();
            console.log(res);
            
            if (res) {
                toast.success(`${res.name} updated successfully`);
                navigate('/admin/allproducts');
            }else{
                toast.error('Submission failed,Try again later')
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
        

    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
        const res = await deleteProduct(params.id).unwrap();

        if (res) {
            toast.success(`${res.name} deleted successfully`)
            navigate('/admin/allproducts');

        } else {
            toast.error('Deletion failed,Try again later')
        }
    }

    return (
        <div className="container mx-auto xl:px-24 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <AdminMenu />
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Update Product</h1>
                
                {/* Image Upload Section */}
                <div className="mb-6">
                     {image && (
                        <div className="text-center mb-4">
                            <img
                                src={image}
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
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={deleteHandler}
                            className="px-6 py-3 rounded-lg text-white bg-red-500 hover:bg-red-600 font-bold focus:ring focus:ring-red-300 focus:outline-none"
                        >
                            Delete
                        </button>
                       
                    </div>
                   
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
