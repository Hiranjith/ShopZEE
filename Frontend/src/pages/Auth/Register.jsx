import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import { ToastContainer, toast } from 'react-toastify';


function Register() {

    //create states for entering data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const {search} = useLocation();
    const searchParameter = new URLSearchParams(search);
    const redirect = searchParameter.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const registerHandler = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            toast.error('Password do not match')

        } else {
            try {
                
                const res = await register({username, email, password}).unwrap()
                console.log(res);
                dispatch(setCredentials({...res}))
                navigate(redirect);
                toast.success("You are successfully registered")

            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

    return (
<section className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-1/2 bg-white p-8 shadow-lg rounded-lg">
    <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
    <form onSubmit={registerHandler} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-700 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={username}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 font-medium">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm text-gray-700 font-medium">
          Confirm Password
        </label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          className="mt-2 p-2 border rounded w-full"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-green-600 w-full"
      >
        {isLoading ? "Signing up....." : "Sign up"}
      </button>
      {isLoading && <Loader />}
    </form>
    <div className="text-center mt-4">
      <p>
        Are you an existing user?{" "}
        <Link
          to={redirect ? `/login?redirect=${redirect}` : "/redirect"}
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
</section>


    );
}

export default Register;
