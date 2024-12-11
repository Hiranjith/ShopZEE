import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {userInfo} = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const { search } = useLocation();
    const searchParameter = new URLSearchParams(search)
    
    const redirect = searchParameter.get('redirect') || '/'

    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])

    const loginHandler = async (e) =>{
        e.preventDefault()

        try {
            const res = await login({email,password}).unwrap()
            console.log('from login ',res);
            dispatch(setCredentials({...res}))
            
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error?.data.message || error.message)
        }
    }


    return (
<>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
        <div className="bg-white p-10 rounded shadow-lg w-[50%] max-w-lg">
            <section>
                <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>

                <form onSubmit={loginHandler} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-green-500 text-white rounded px-4 py-2 w-full hover:bg-green-600 disabled:opacity-50"
                    >
                        {isLoading ? "Logging In..." : "Login"}
                    </button>
                    {isLoading && <Loader />}
                </form>

                <div className="text-center mt-4">
                    <p>
                        New user?{" "}
                        <Link
                            to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    </div>
</>


    );
}

export default Login;
