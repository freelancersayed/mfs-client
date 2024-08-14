import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaSearch } from 'react-icons/fa';

const BlockUser = () => {

    const axiosPublic = useAxiosPublic();

  // Fetch all users
  const { data: usersPending =[], refetch } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-user-block");
      return res.data;
    },
  });

    console.log(usersPending );


    const handleStatusChange = async (user, newStatus) => {
      try {
          await axios.put(`https://mfs-server-xi.vercel.app/update-status/${user._id}`, {status: newStatus});


          refetch(); // Refresh the users data
      } catch (error) {
          console.error("Error updating status:", error);
      }
  };

    return (
        <div className='max-w-[1280px] mx-auto'>
   <div className=" px-4">
      <div className="overflow-x-aut shadow-lg rounded-lg">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
            <tr className=" bg-gray-900">
                <th className="py-2 lg:w-60 md:w-20 text-left border-b px-5">Serial</th>
                <th className="py-2 lg:w-60 md:w-44 text-left  border-b">Photo</th>
                <th className="py-2 lg:w-60 md:w-44 text-left  border-b">Name</th>
                <th className="py-2 lg:w-60 md:w-52 text-left  border-b">Email</th>
                <th className="py-2 lg:w-60 md:w-44 text-left  border-b">Role</th>
                <th className="py-2  text-left  border-b px-5">Action</th>
              </tr>
            </thead>
          </table>
          <table className=" bg-white">
            <tbody className=''>
              {usersPending.map((user, index) =>  (
            
                 <tr key={user._id} className="hover:bg-gray-100 flex">
               <td className="py-2 lg:w-52 md:w-20 border-b px-5">{index + 1} </td>
               <td className="py-2 lg:w-60 md:w-44 border-b px-5">
                 <img className="w-10 h-10 rounded-full" src={user.photo} alt={user.name} />
               </td>
               <td className="py-2 lg:w-60 border-b px-5">{user.name}</td>
               <td className="py-2 lg:w-60 border-b">{user.email}</td>
               <td className="py-2 lg:w-52 border-b text-red-500">
                 {user.status}
               </td>
               <td className="py-2 pl-2 border-b">
                 <button
                   onClick={(e) => handleStatusChange(user, e.target.value)}
                   value="Approved"
                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-500"
                 >
                   Approved
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
                    <td  className="text-center py-5 text-gray-700 px-5 text-3xl">There is no block user</td>
                  </tr>
                ): null
              }
          </table>
        </div>

      </div>
</div>
    );
};

export default BlockUser;
