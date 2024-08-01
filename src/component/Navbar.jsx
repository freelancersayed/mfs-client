import React from 'react';
import { Link } from 'react-router-dom';

import '../index.css'
import { FaHome } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from 'react-icons/tb';

const Navbar = () => {
    return (
       <div className='w-24 mx-auto'>

         <div className='flex items-center justify-center z-30 bg-[#ffffff04] pb-4  w-24 mx-auto  h-[50px] -translate-y-8 hover:translate-y-0 transition-transform text-center rounded-b-md  fixed mt- sidbar gap-6' title='Click and back Home'>
       <div className='flex gap-6 bg-gray-800 shadow-md pb-2 pt-4 px-5 rounded-b-md'>
       <Link className=' hidde hover:underline font-bold ' title='Click and back Home' to="/"><FaHome className='hover:text-xl text-white'></FaHome></Link>
       <Link className=' hidde hover:underline font-bold' title='Click and back Home' to="/"><TbLayoutDashboardFilled className='hover:text-xl text-white' /></Link>
       </div>
        </div>
       </div>
    );
};

export default Navbar;