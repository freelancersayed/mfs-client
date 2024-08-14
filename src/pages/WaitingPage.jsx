import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const WaitingPage = () => {
  const [user, setUser] = useState(null);
  const {email} = useContext(AuthContext)

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
{
  user?.status === 'Pending' ? (
    <div className="bg-white px-10 pt-8 rounded-lg shadow-md text-center">
    <h1 className="text-2xl font-bold mb-4 text-teal-500">Your Request is</h1>
      <div className="text-xl flex items-center justify-center text-white font-b bg-green-500 rounded-full">{user?.status}<p className="loading loading-dots loading-md mt-2"></p></div>
    <p className="text-[12px] mt-2 text-black pb-2">your account approved within 24 hour`s</p>
  </div>
  
):(

 <div className="bg-cover b-[url('https://img.freepik.com/free-psd/realistic-confetti-border-isolated_23-2151232834.jpg')]">
     <div className="bg[#a7a5a55e] px-10 pt-8 rounded-lg shadow-md text-center h-52 w-80">
      <h1 className='text- font-bold'>Congratulations</h1>
    <h1 className="text-2xl font-bold mb-4 text-blue-500">Your Request is</h1>
    {
      user?.status === 'Approved' ? <div className="text-2xl flex items-center justify-center text-teal-500 font-bold b-green-400 rounded-full">{user?.status}</div>:
      <div className="text-xl flex items-center justify-center text-white font-b bg-green-500 rounded-full">{user?.status}<p className="loading loading-dots loading-md mt-2"></p></div>
    }
    <Link to="/login"><button className="text-sm  btn-sm btn w-44 rounded-full hover:bg-pink-500 bg-green-500 text-white py-1 mt-6">Login</button></Link>
    {/* <p className="text-[12px] mt-2 text-black pb-2">your account approved within 24 hour`s</p> */}
  </div>
 </div>
  )
}
      
    </div>
  );
};

export default WaitingPage;
