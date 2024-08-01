import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaSearch } from 'react-icons/fa';

const PendingAgent = () => {

    const axiosPublic = useAxiosPublic();

  // Fetch all users
  const { data: usersPending =[], refetch } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-agent-pending");
      return res.data;
    },
  });

    console.log(usersPending );


    const handleStatusChange = async (user, newStatus) => {
      try {
          await axios.put(`http://localhost:5000/update-status/${user._id}`, {status: newStatus, balance: user.balance+1000});


          refetch(); // Refresh the users data
      } catch (error) {
          console.error("Error updating status:", error);
      }
  };

    return (
        <div className='max-w-[1280px] mx-auto'>
   <div className="container mx-auto px-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
            <tr className=" bg-gray-900">
                <th className="py-2 w-60 text-left border-b px-5">Serial</th>
                <th className="py-2 w-60 text-left  border-b">Photo</th>
                <th className="py-2 w-60 text-left  border-b">Name</th>
                <th className="py-2 w-60 text-left  border-b">Email</th>
                <th className="py-2 w-60 text-left  border-b">Role</th>
                <th className="py-2  text-left  border-b px-5">Action</th>
              </tr>
            </thead>
          </table>
          <table className=" bg-white">
            <tbody className=''>
              {usersPending.map((user, index) =>  (
            
                 <tr key={user._id} className="hover:bg-gray-100 flex">
               <td className="py-2 w-52 border-b px-5">{index + 1} </td>
               <td className="py-2 w-60 border-b px-5">
                 <img className="w-10 h-10 rounded-full" src={user.photo} alt={user.name} />
               </td>
               <td className="py-2 w-60 border-b px-5">{user.name}</td>
               <td className="py-2 w-60 border-b">{user.email}</td>
               <td className="py-2 w-60 border-b">
                 {user.role} {user.balance}
                 <select
                   className="w-4 mt-1 ml-1"
                   // value={user.role}
                   onChange={(e) => handleStatusChange(user, e.target.value)}
                 >
                   <option value="Agent">User</option>
                   <option value="Agent">Agent</option>
                 </select>
               </td>
               <td className="py-2 border-b  ">
                 <button
                   onClick={() => handleDelete(user)}
                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-500"
                 >
                   Delete
                 </button>
               </td>
             </tr>
              )
              )}
              
              {/* : <div className="w-full flex mx-auto justify-center">
               <img className="w-1/2 mx-auto" src="/no-data.png" alt="" />
              </div> */}
            </tbody>
            {
                usersPending.length === 0 ? (
                  <tr className='flex justify-center mt- items-center'>
                    <td  className="text-center py-5 text-gray-700 px-5 text-3xl">There is no pending agent</td>
                  </tr>
                ): null
              }
          </table>
        </div>

      </div>
</div>
    );
};

export default PendingAgent;
