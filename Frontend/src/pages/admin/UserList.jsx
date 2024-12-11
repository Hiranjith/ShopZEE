import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useDeleteUserMutation, 
        useUpdateUserDetailsMutation,
        useGetUsersQuery } from '../../redux/api/usersApiSlice';
import AdminMenu from './AdminMenu';





const UserList = () => {

    const [deleteUser] = useDeleteUserMutation();
    const {data: users, refetch, error, isLoading} = useGetUsersQuery();
    const [updateUser] = useUpdateUserDetailsMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUsername, setEditableUsername] = useState('');
    const [editableEmail, setEditableEmail] = useState('');

    console.log("users are :" , users);
    

    useEffect(() => {
        refetch()
    }, [refetch])

    const deleteHandler = async (id) => {
        if(window.confirm("Are you sure you want to delete?")){
            try {
                await deleteUser(id);
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

    const toggleEdit = async (id, username, email) => {
        setEditableUserId(id);
        setEditableUsername(username);
        setEditableEmail(email);
    }

    const updateHandler = async (id) => {
        try {
            const userToUpdate = users.find((user) => user._id === id);

            if (!userToUpdate) {
                throw new Error("User not found");
            }
            await updateUser({
                userId: id,
                username: editableUsername,
                email: editableEmail,
                isAdmin: userToUpdate.isAdmin
            })
        } catch (error) {
            toast.error(error?.data?.message ||error.message)
        }
        setEditableUserId[null];
        refetch();

    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <AdminMenu />
            <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Users
            </h1>
            </div>

            {
                isLoading ? (<Loader />) : 
                error && error.message ? (<Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>) : 
                (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-indigo-600 text-white text-sm leading-normal">
                                    <th className="px-6 py-3 text-left font-semibold uppercase">User ID</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase">User Name</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase">User Email</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase">Admin Status</th>
                                    <th className="px-6 py-3 text-left font-semibold uppercase"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="px-6 py-4 text-gray-700 text-sm">{user._id}</td>
                                            <td className="px-6 py-4 text-gray-700 text-sm">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center">
                                                        <input 
                                                            type="text" 
                                                            value={editableUsername} 
                                                            onChange={(e) => { setEditableUsername(e.target.value); }} 
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                        />
                                                        <button 
                                                            className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
                                                            onClick={() => updateHandler(user._id)}
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <p>{user.username}</p>
                                                        <button 
                                                            onClick={() => toggleEdit(user._id, user.username, user.email)} 
                                                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-sm">
                                                {editableUserId === user._id ? (
                                                    <div className="flex items-center">
                                                        <input 
                                                            type="text" 
                                                            value={editableEmail} 
                                                            onChange={(e) => { setEditableEmail(e.target.value); }} 
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                        />
                                                        <button 
                                                            className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
                                                            onClick={() => updateHandler(user._id)}
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <p>{user.email}</p>
                                                        <button 
                                                            onClick={() => toggleEdit(user._id, user.username, user.email)} 
                                                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-sm text-center">
                                                {user.isAdmin ? (
                                                    <FaCheck className="text-green-500" />
                                                ) : (
                                                    <FaTimes className="text-red-500" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-sm text-center">
                                                {!user.isAdmin && (
                                                    <button 
                                                        onClick={() => deleteHandler(user._id)} 
                                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
    
}

export default UserList;
