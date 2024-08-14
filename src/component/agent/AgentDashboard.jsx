import React, { useContext, useEffect, useState } from 'react';
import { FaDollarSign, FaHome, FaSearchDollar, FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import LogoutButton from '../../pages/LogOute';
import '../../index.css'

const AgentDashboard = () => {

    const [user, setUser] = useState(null); // Correct way to initialize state
    const [showBalance, setShowBalance] = useState(false);
  const { email } = useContext(AuthContext);



  useEffect(() => {
    const fetchData = () => {
      if (email) {
        fetch(`https://mfs-server-xi.vercel.app/user/${email}`)
          .then(res => res.json())
          .then(data => {
            // console.log(data[0]);
            setUser(data[0]); // Setting user data in state
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
    };

    fetchData(); // Fetch data initially

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 5 minutes (300000 ms)
      setShowBalance(false); 
    }, 4000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [email]);


  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

    return (
        <div className="min-h-screen lg:flex-row flex flex-col">



{/* Lg device */}
            {/* Sidebar */}
            <aside className="w- bg-gray-800 text-white hidden min-h-screen fixed lg:block">
                <div className="p-4 text-xl font-semibold border-b border-gray-700">Agent Portal</div>
                <nav className="mt-4">
                <div className="text-white flex flex-col gap-5 py-4 px-  active">
                <NavLink to="/agent-dashboard/cashin">   <button className="flex items-center gap-2 text- hover:bg-gray-400 py-2 pl-5 "><FaHome></FaHome>  Transection Manegment</button></NavLink>
                <NavLink to="/agent-dashboard/history">   <button className="flex items-center gap-2 text- hover:bg-gray-400 py-2 pl-5 "><FaHome></FaHome>  Transection History</button></NavLink>
         
          </div>
            </nav>
            </aside>
            <div className='w-64'>   </div>

 

            {/* Main content */}
            <div className="lg:flex-1 lg:flex flex-col">
                {/* Header  hidden */}
                 <header className="bg-[#ff1bc6] p-4 border-b border-gray-200 hidden lg:block ">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                    <div className='h-12 w-12 rounded-full overflow-hidden'>
                    <FaUser className="text-5xl border border-1 p-1 rounded-full"></FaUser>
                    </div>
                    <h1 className="text-2xl font-semibold">{user?.name}</h1>
                        </div>
                        <div className="flex items-center">
            
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Logout</button> */}
                            <div 
   onClick={()=>setShowBalance(!showBalance)}
    className="rounded-full w-[160px]  bg-white text-red-500 px-2 text-[16px] py-1 py- flex items-center text-center cursor-pointer">
      <FaSearchDollar className={`transition-transform duration-500 font-normal mr-1 ${showBalance ? 'translate-x-[130px]' : 'translate-x-0'} text-left`}></FaSearchDollar>
      {showBalance ?  <span className="flex items-center text-center px-5 transition-transform duration-500">{user?.balance} </span>:<div className="flex items-center "> Check balance</div> }
      </div>
                            <LogoutButton></LogoutButton>
                        </div>
                    </div>
                </header> 

{/* min device view */}

<div className="bg-pink-500 text-white lg:w-full h-[78px] rounded-b-lg py-3 lg:hidden lg:relative sm:fixed">
   <div className="flex  justify-between px-2 ">

 <div className="flex gap-2 items-center">
 <div className="flex items-center w-48 gap-1">
<FaUser className="text-5xl border border-1 p-1 rounded-full"></FaUser>
<h1 className="text-2xl ">{truncateText(user?.name, 10) }</h1>
</div>
   <div 
   onClick={()=>setShowBalance(!showBalance)}
    className="rounded-full w-[162px]  bg-white text-red-500 px-[5px] text py-[3px] flex items-center text-center">
      <FaSearchDollar className={`transition-transform duration-500 ${showBalance ? 'translate-x-[94px]' : 'translate-x-0'} text-left`}></FaSearchDollar>
      {showBalance ?  <span className="flex items-center text-center px-5 ">{user?.balance} </span>:<div className="flex items-center "> Check balance</div> }
      </div>

 </div>
 <LogoutButton></LogoutButton>
   </div>
      </div>


   <section className='lg:hidden'>
   <div className='h-[78px] mt-1'></div>
      <div className=' overflow-hidden rounded-lg shadow'><img className='h-28 w-full' src="/ag-baner.png" alt="" /></div>

        <div className="active-1 grid justify-items-center grid-cols-2 gap-4 px-5 mx-auto lg:hidden  py-4 shadow-sm">
        <NavLink to="/agent-dashboard/cashin" className="text-center flex shadow-md shadow-gray-300 items-center rounded hover:border" ><img className="w-16 rounded" src="/trmaneg.png"     alt="" /><p className="text-sm">Transection Management</p> </NavLink>
        <NavLink to="/agent-dashboard/history" className="text-center flex shadow-md shadow-gray-300 items-center rounded hover:border" ><img className="w-16 rounded" src="/history.png"  alt="" /><p className="text-sm">Transection History</p> </NavLink>
      </div>
   </section>

               <div className=''>
                <Outlet></Outlet>
               </div>
         
            </div>
        </div>
    );
};

export default AgentDashboard;
