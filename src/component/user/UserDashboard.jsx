import React, { useContext, useEffect, useState } from "react";
import { FaBalanceScale, FaDollarSign, FaHome, FaSearchDollar } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LogoutButton from "../../pages/LogOute";
import { AuthContext } from "../../provider/AuthProvider";
import { FaScaleBalanced, FaUser } from "react-icons/fa6";

const UserDashboard = () => {

  const [user, setUser] = useState(null); // Correct way to initialize state
  const [showBalance, setShowBalance] = useState(false);
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

    const interval = setInterval(() => {
      setShowBalance(false); 
      fetchData(); // Fetch data every 5 minutes (300000 ms)
    }, 8000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [email]);


  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength) + "...";
  };

  return (
    <div className="">
<section className="lg:hidden">
<div className="">
<div className="bg-[#ff1bc6] text-white w-full h- rounded-b-lg py-3 mb-">
   <div className="flex justify-between px-2 ">

 <div className="flex gap-2 items-center">
<div className="flex items-center gap-1">
<FaUser className="text-4xl border border-1 p-1 rounded-full w-12"></FaUser>
<h1 className="text-2xl w-full">{truncateText(user?.name, 6) }</h1>
</div>
   <div 
   onClick={()=>setShowBalance(!showBalance)}
    className="rounded-full w-[140px]  bg-white text-red-500 px-[5px] text-sm py-[3px] flex items-center text-center">
      <FaSearchDollar className={`transition-transform duration-500 ${!showBalance ? 'translate-x-[115px]' : 'translate-x-0'} text-left`}></FaSearchDollar>
      {showBalance ?  <span className="flex items-center text-center px-5 ">{user?.balance} </span>:<div className="flex items-center "> Check balance</div> }
      </div>
  

 </div>
   <LogoutButton></LogoutButton>
   </div>
      </div>
      
      <div className="grid justify-items-center grid-cols-4 gap-4 px- mx-auto lg:hidden  py-4 shadow">
        <Link to="/user-dashboard/user-wellcome" className="text-center" ><img className="w-12 rounded hover:-translate-y-1" src="/cashin.png"     alt="" /><p className="text-sm">cash In</p> </Link>
        <Link to="/user-dashboard/send-money" className="text-center" ><img className="w-12 rounded hover:-translate-y-1" src="/sendmoney.png"  alt="" /><p className="text-sm">send money</p> </Link>
        <Link to="/user-dashboard/cash-out" className="text-center" ><img className="w-12 rounded hover:-translate-y-1" src="/cashout.png"    alt="" /><p className="text-sm">cash out</p> </Link>
        <Link to="/user-dashboard/history" className="text-center" ><img className="w-12 rounded hover:-translate-y-1" src="/history.png"    alt="" /><p className="text-sm">history</p> </Link>
        
      </div>
</div>
   <div className="">
    <Outlet></Outlet>
    </div>
</section>
  

      {/* lg divice==================================== */}
      <div className="flex">
        <div className="w-64 min-h-screen hidden lg:block fixed hover:block bg-gray-800  ">
          <div className="pt-10 pb-5 px-2 flex gap- items-center">
           <div className="w-24 h-24 rounded-full border overflow-hidden">
           <img className="" src={user?.photo} alt="image" />
           </div>
            <h1 className="text-white text-3xl text-center flex-1">{user?.name}</h1>
          </div>
          <hr />

          <div className="text-white flex flex-col gap-5 py-4 px-  nav">
          {/* <NavLink to="/user-dashboard/user-wellcome" className="hover:bg-[#ff3fa9]"><button className="flex items-center gap-2 text- py-2 pl-5 active:bg-black"><FaHome></FaHome> Home</button></NavLink> */}
      <NavLink to="/user-dashboard/user-wellcome" className="hover:bg-[#ff3fa9]"><button className="flex items-center gap-2 text- py-2 pl-5 active:bg-black"><FaHome></FaHome> Cash In</button></NavLink>
      <NavLink to="/user-dashboard/send-money" className="hover:bg-[#ff3fa9]"> <button className="flex items-center gap-2 text-  py-2 pl-5 "><FaHome></FaHome>  Send Money</button></NavLink>
      <NavLink to="/user-dashboard/cash-out" className="hover:bg-[#ff3fa9]"> <button className="flex items-center gap-2 text-  py-2 pl-5 "><FaHome></FaHome>  Cash Out</button></NavLink>
      <NavLink to="/user-dashboard/history" className="hover:bg-[#ff3fa9]"> <button className="flex items-center gap-2 text-  py-2 pl-5 "><FaHome></FaHome> Transaction history</button></NavLink>
          </div>
        </div>

        <div className="w-80"></div>



     <div className="px- w-full hidden lg:block">
     <div className="text-center flex bg-pink-500  py-5 text-white text-2xl justify-between  px-4"><span>User Dashboard</span>

<div className="flex items-center gap-5">
  
<div 
   onClick={()=>setShowBalance(!showBalance)}
    className="rounded-full w-[175px]  bg-white text-red-500 px-2 text-xl py- flex items-center text-center cursor-pointer">
      <FaSearchDollar className={`transition-transform duration-500 font-normal mr-1 ${showBalance ? 'translate-x-[130px]' : 'translate-x-0'} text-left`}></FaSearchDollar>
      {showBalance ?  <span className="flex items-center text-center px-5 transition-transform duration-500">{user?.balance} </span>:<div className="flex items-center "> Check balance</div> }
      </div>

<LogoutButton></LogoutButton>
</div>
     </div>
        <div className="w- h-48 overflow-hidden hidden mx-1 lg:block bg-gray-100 shadow border mt-2 rounded-md bg-cover bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp5080435.jpg')]">
        <img className="w-screen h-52" src="https://www.shutterstock.com/image-vector/cash-back-50-off-banner-260nw-1870877113.jpg" alt="" />
        </div>
     <Outlet></Outlet>
     </div>
      </div>
    </div>
  );
};

export default UserDashboard;
