import React, { useContext, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import LogoutButton from '../../pages/LogOute';

const AdminMainDashboard = () => {

    const [user, setUser] = useState(null); // Correct way to initialize state

  const { email } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      if (email) {
        fetch(`http://localhost:5000/user/${email}`)
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
      fetchData(); // Fetch data every 5 minutes (300000 ms)
    }, 30000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [email]);


    return (
        <div className="min-h-screen lg:flex">
            {/* Sidebar */}
            <aside className="min-w-60 bg-gray-800 text-white hidden lg:block">
                <div className="p-4 text-xl font-semibold border-b border-gray-700">Admin Dashboard</div>
                <nav className="mt-4">
                <div className="text-white flex flex-col gap-5 py-4 px-  active">
                <NavLink to="/admin-dashboard/admin"  className="hover:bg-slate-400">   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Dashboard</button></NavLink>
                <NavLink to="/admin-dashboard/admin/all-users"  className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Personal</button></NavLink>
                <NavLink to="/admin-dashboard/admin/all-agent"  className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Agent</button></NavLink>
                <NavLink to="/admin-dashboard/admin/transection"  className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Transection History</button></NavLink>
                <NavLink to="/admin-dashboard/admin/pending-users" className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Pending Users</button></NavLink>
                <NavLink to="/admin-dashboard/admin/pending-agent" className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Pending Agent</button></NavLink>
                <NavLink  to="/admin-dashboard/admin/block" className="hover:bg-slate-400" >   <button className="flex items-center gap-2 text- py-2 pl-5 "><FaHome></FaHome>  Block Users</button></NavLink>
         
          </div>
            </nav>
            </aside>

 

            {/* Main content */}
            <div className="lg:flex-1  lg:flex lg:flex-col">
                {/* Header */}
                <header className="bg-gray-800 p-2 border-b border-gray-200 ">
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                    <div className='h-12 w-12 rounded-full overflow-hidden'>
                    <img src="https://i.pinimg.com/originals/6a/44/f0/6a44f0e35b10e6ed063eeebf7ed844f9.jpg" alt="" />
                    </div>
                    <h1 className="text-2xl font-semibold">{user?.name}</h1>
                        </div>
                        <div className="flex items-center">
            
                            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Logout</button> */}
                            <p className='px-5 text-white'></p>
                            <LogoutButton></LogoutButton>
                        </div>
                    </div>
                </header>

<section className='lg:hidden block'>
<div className="grid justify-items-center grid-cols-6 gap-2 px-4 mx-auto lg:hidden  py-4 shadow">
  <NavLink to="/admin-dashboard/admin/all-users" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/user.png"     alt="" /><p className="text-sm">Personal</p> </NavLink>
  <NavLink to="/admin-dashboard/admin/all-agent" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/agent.png"  alt="" /><p className="text-sm">Agents</p> </NavLink>
  <NavLink to="/admin-dashboard/admin/pending-users" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/p-user.png"    alt="" /><p className="text-sm">Pending Users</p> </NavLink>
  <NavLink to="/admin-dashboard/admin/pending-agent" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/agent-p.png"    alt="" /><p className="text-sm">Pending Agents</p> </NavLink>
  <NavLink to="/admin-dashboard/admin/block" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/block-user.png"    alt="" /><p className="text-sm">Block Users</p> </NavLink>
  <NavLink to="/admin-dashboard/admin/transection" className="text-center" ><img className="w-12 hover:-translate-y-1 rounded" src="/history.png"    alt="" /><p className="text-sm">Transection History</p> </NavLink>
        
      </div>
</section>

               <div>
                <Outlet></Outlet>
               </div>
         
            </div>
        </div>
    );
};

export default AdminMainDashboard;
