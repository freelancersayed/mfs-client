import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const { setEmail, setNumber, } = useContext(AuthContext); 
  const axiosPublic = useAxiosPublic();

  const naviget = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const pin = form.pin.value;
    const number = form.number.value;
    const email = form.email.value;
    const status = "Pending";
    const role = "user";
    const balance = 0;

    if (pin.length !== 5 || isNaN(pin)) {
      setError('PIN must be exactly 5 digits.');
      return;
    }

    try {
      const response = await axios.post('https://mfs-server-xi.vercel.app/user', {
        name,
        email,
        pin,
        number,
        status,
        role,
        balance,
      });

      localStorage.setItem('token', response.data.token);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your registration was successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Registration failed. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    

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
      const response = await axiosPublic.post('/login', { email, pin });
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
       }else if (user.role === 'agent' && user.status === 'Conform') {
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
    <div className='lg:flex md:flex justify-center max-w-[1280px] rounded  mx-auto shadow-lg overflow-hidden'>
      <div className=''>
        <img className='w-full md:h-[520px] h-60' src="https://img.freepik.com/premium-vector/online-education-learning-concept-with-students_662093-225.jpg" alt="" />
      </div>
      <div className='w-96 mx-auto bg-white rounded py-10 px-5'>
        <h1 className='text-center pb-10 text-3xl text-pink-500 '>User Register</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 space-y-5'>
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='Name' name="name" required />
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='5-digit PIN' name="pin" required />
          <input className='border bg-gray-50 p-1 rounded' type="number" placeholder='Number' name="number" required />
          <input className='border bg-gray-50 p-1 rounded' type="email" placeholder='Email' name="email" required />
          <button className='border bg-pink-500 text-white p-1 rounded' type="submit">Register</button>
        </form>
        <div className='mt-5'>
   <Link to="/login" className='text-blue-600 hover:underline text-sm pt-5'><span className='text-black'>All Ready have an account please</span> Login</Link>
   </div>
      </div>
    </div>
  );
};

export default RegisterForm;
