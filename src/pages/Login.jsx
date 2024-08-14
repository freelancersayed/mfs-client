// LoginForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState('');
  const { setEmail, setNumber, } = useContext(AuthContext); 
  const axiosSecure = useAxiosSecure();

  const naviget = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const pin = form.pin.value;
    const email = form.email.value;

    console.log(email);

    try {
      // Check if the user exists and get status
      const res = await axios.get(`https://mfs-server-xi.vercel.app/user-login/${email}`);
      const userData = res.data[0]; // Assuming only one user is returned
      if (!userData) {
        throw new Error('User not found');
      }

      console.log(userData);
      // Store status in localStorage and update Context
      // localStorage.setItem('user-email', userData.email);
      // localStorage.setItem('user-number', userData.number);
      setEmail(userData.email);
      setNumber(userData.number);

      // Authenticate user
      const response = await axiosSecure.post('/login', { email, pin });
      const { token } = response.data;
      localStorage.setItem('auth-token', token);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login successful!',
        showConfirmButton: false,
        timer: 1500,
      });

       // Fetch the user by email
       const userResponse = await axios.get(`https://mfs-server-xi.vercel.app/user-login/${email}`);
       const user = userResponse.data[0];

       if(user.status === 'Pending'){
        naviget("/waiting")
        return
       }

       if (user.role === 'admin') {
        naviget("/admin-dashboard/admin")
        return
       }else if (user.role === 'agent') {
        naviget("/agent-dashboard")
        return
       }else if (user.role === 'user' && user.status === 'Conform') {
        naviget("/user-dashboard/user-well")
        return
       }

       console.log(user);
      
      form.reset();
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className=" justify-center bg-gray- pt-10">
      <div className='bg-pink-5 rounded  h items-center justify-center'>
      <h1 className='lg:text-5xl text-4xl font-bold text-center text-pink-500'>Wellcom to eCash</h1>
      {/* <img className='w-52 mx-auto' src="/ecash.png" alt="" /> */}
      </div>
    <div className=" flex  justify-center bg-gray- px-8 lg:px-0">
    <div className="w-96 mx-auto bg-white px-5 py-10 rounded border lg:border-[#fd10b6] shadow-md mt-20 ">
        <img className='w-28  mx-auto' src="/ecash.png" alt="" />
        <h1 className="text-center pb-10 text-3xl text-white">Login</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

          <input
            className="border bg-gray-50 p-1 rounded"
            type="text"
            placeholder="Enter email / phone"
            name="email"
            required
          />
          <input
            className="border bg-gray-50 p-1 rounded"
            type="password"
            placeholder="PIN"
            name="pin"
            required
          />
          <button className="border bg-pink-500 text-white font-bold hover:bg-[#fd10a2] hover:translate-y-0.5 p-1 rounded" type="submit">
            Login
          </button>
        </form>
   <div className='mt-5'>
   <Link to="/reg-dashboard/us-register" className='text-blue-600 hover:underline pt-5'>create a new account</Link>
   </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
