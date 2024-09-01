import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
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
    const role = "agent";
    const balance = 0;

    if (pin.length !== 5 || isNaN(pin)) {
      setError('PIN must be exactly 5 digits.');
      return;
    }

    try {
      const response = await axios.post('https://mfs-server-xi.vercel.app/agent', {
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
    <div className='md:flex  max-w-[1280px] rounded  md:mx-auto shadow-lg overflow-hidden flex-row-reverse mx-4'>
      <div className=''>
        <img className='w-full md:h-[520px] h-60' src=" https://img.freepik.com/premium-vector/business-analytics-dashboard-with-people_662093-240.jpg" alt="" />
      </div>
      <div className='w-96 mx-auto bg-white rounded py-10 px-5'>
        <h1 className='text-center pb-10 text-3xl text-teal-600'>Agent Register</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 space-y-5'>
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='Name' name="name" required />
          <input className='border bg-gray-50 p-1 rounded' type="text" placeholder='5-digit PIN' name="pin" required />
          <input className='border bg-gray-50 p-1 rounded' type="number" placeholder='Number' name="number" required />
          <input className='border bg-gray-50 p-1 rounded' type="email" placeholder='Email' name="email" required />
          <button className='border bg-teal-500 text-white p-1 rounded' type="submit">Register</button>
        </form>
        <div className='mt-5'>
   <Link to="/login" className='text-blue-600 hover:underline text-sm pt-5'><span className='text-black'>All Ready have an account please</span> Login</Link>
   </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
