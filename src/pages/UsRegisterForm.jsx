import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const pin = form.pin.value;
    const number = form.number.value;
    const email = form.email.value;
    const status = "Pending";
    const role = "User";
    const balance = 0;

    if (pin.length !== 5 || isNaN(pin)) {
      setError('PIN must be exactly 5 digits.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user', {
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

      form.reset();
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
  };

  return (
    <div className='flex justify-center max-w-[1280px] mx-auto bg-gray-100 min-h-screen'>
      <div className='w-96 mx-auto bg-white px-5 py-10 rounded border border-[#fd10b6] shadow-md mt-20 h-full'>
      <img className='w-12 h-12 rounded-full mx-auto' src="" alt="" />
        <h1 className='text-center pb-10 text-3xl '>User Register</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='Name' name="name" required />
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='5-digit PIN' name="pin" required />
          <input className='border bg-gray-50 p-1 rounded' type="number" placeholder='Number' name="number" required />
          <input className='border bg-gray-50 p-1 rounded' type="email" placeholder='Email' name="email" required />
          <button className='border bg-blue-400 p-1 rounded' type="submit">Register</button>
        </form>
        <div className='mt-5'>
   <Link to="/login" className='text-blue-600 hover:underline pt-5'><span className='text-black'>All Ready have an account please</span> Login</Link>
   </div>
      </div>
    </div>
  );
};

export default RegisterForm;
