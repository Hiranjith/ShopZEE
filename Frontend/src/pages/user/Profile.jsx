import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useProfileMutation } from '../../redux/api/usersApiSlice';
import { toast } from 'react-toastify';



const Profile = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const {userInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [updateProfile, {isLoading: loadingUpdatedProfile}] = useProfileMutation()

    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.email, userInfo.username])

    const updateHandler = async (e) => {
        e.preventDefault();

        if(password != confirmPassword){
            toast.error("Password does not match")
        }else{
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfully")
            } catch (error) {
                toast.error(error?.data?.message || error.message )
            }
        }
    }

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-1/2 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

            <form onSubmit={updateHandler} className="space-y-6">
                <div>
                    <label  className="block text-sm text-gray-700 font-medium">
                        Name
                    </label>
                    <input type="text" id='name' value={username} 
                    className="mt-2 p-2 border rounded w-full"
                    onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div>
                    <label  className="block text-sm text-gray-700 font-medium">
                        Email Address
                    </label>
                    <input type="email" id='email' value={email} 
                    className="mt-2 p-2 border rounded w-full"
                    onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div>
                    <label  className="block text-sm text-gray-700 font-medium">
                        Password
                    </label>
                    <input type="password" id='password' value={password} 
                    className="mt-2 p-2 border rounded w-full"
                    onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div>
                    <label  className="block text-sm text-gray-700 font-medium">
                        Confirm Password
                    </label>
                    <input type="password" id='confirmPassword' value={confirmPassword} 
                    className="mt-2 p-2 border rounded w-full"
                    onChange={(e)=> setConfirmPassword(e.target.value)}/>
                </div>

                <button
                    type="submit"
                    disabled={loadingUpdatedProfile}
                    className="bg-green-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-green-600 w-full"
                    >
                    {loadingUpdatedProfile ? "Updating....." : "Update"}
                </button>
                {loadingUpdatedProfile && <Loader />}
            </form>
            </div>
        </section>

    );
}

export default Profile;