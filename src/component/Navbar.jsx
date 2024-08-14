import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../index.css'
import { FaHome } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const [user, setUser] = useState('')
  
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      if (email) {
        fetch(`https://mfs-server-xi.vercel.app/user/${email}`)
          .then(res => res.json())
          .then(data => {
            console.log(data[0]); // Checking fetched data
            setUser(data[0]); // Setting user data in state
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
    };

    fetchData(); // Fetch data initially
  }, [email]);


    return (
       <div className=''>

         <div className='mt-44  z-30 bg-[#ffffff04] pb-4 w-20 -translate-x-10 hover:translate-x-0 transition-transform text-center rounded-b-md  fixed mt- sidbar' title='Click and back Home'>
       <div className='bg-gray-800 shadow-md  py-4 px-3 rounded-md w-10 ml-2'>
       <Link className=' hidde hover:underline font-bold' title='Click and back Home' to="/"><FaHome className='hover:text-xl text-white mb-3'></FaHome></Link>
       <Link className=' hidde hover:underline font-bold mt-' title='Click and back Home' to={`${user?.role}-dashboard`}><TbLayoutDashboardFilled className='hover:text-xl text-white' /></Link>
       </div>
        </div>
       </div>
    );
};

export default Navbar;