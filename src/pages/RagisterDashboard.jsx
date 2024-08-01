import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RagisterDashboard = () => {
    return (
        <div className='bg-gray- min-h-screen'>
            <div className='max-w-[1280px] mx-auto bg-gray-100 py-2'>
                <h1 className='text-4xl font-bold text-center mt-5 mb-10 text-teal-500'>Wellcom E-Cash Registration</h1>
                <div className='flex  w-full mx-auto justify-center reg-dash'>
                    <NavLink  className='px-20 py-6 text-xl font-bold text-[#fd10b6] hover:translate-x-1 shadow-md border-t w-full text-center' to="/reg-dashboard/us-register">User Registration</NavLink>
                    <NavLink  className='px-20 py-6 text-xl font-bold text-[#fd10b6] hover:text hover:translate-x-1 shadow-md border-t w-full text-center' to="/reg-dashboard/ag-register">Agent Registration</NavLink>
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default RagisterDashboard;