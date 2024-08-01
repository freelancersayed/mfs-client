import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const PendingUser = () => {

    const axiosPublic = useAxiosPublic();

  // Fetch all users
  const { data: usersPending =[], refetch } = useQuery({
    queryKey: ["pending"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-users-pending");
      return res.data;
    },
  });

    console.log(usersPending );


    const handleStatusChange = async (user, newStatus) => {
      try {
          await axios.put(`http://localhost:5000/update-status/${user._id}`, {status: newStatus, balance: user.balance+40});


          refetch(); // Refresh the users data
      } catch (error) {
          console.error("Error updating status:", error);
      }
  };

    return (
        <div className='max-w-[1280px] mx-auto'>
   <div className="container mx-auto px-4 shadow-lg rounded-lg  ">
      <div className="overflow-x-auto ">
          <table className="min-w-full bg-gray-900 text-white rounded-t-lg">
            <thead>
              <tr className="">
                <th className="py-2 w-60 text-left border-b px-2">Serial</th>
                <th className="py-2 w-60 text-left  border-b">Photo</th>
                <th className="py-2 w-60 text-left  border-b">Name</th>
                <th className="py-2 w-60 text-left  border-b">Email</th>
                <th className="py-2 w-60 text-left  border-b">Role</th>
                <th className="py-2 w- text-left  border-b px-2">Action</th>
              </tr>
            </thead>
          </table>
          <table className=" bg-white">
            <tbody className=''>
              {usersPending .map((user, index) =>  (
            
               <tr key={user._id} className="hover:bg-gray-100 ">
               <td className="py-2 w-60 px-5 border-b">{index + 1} </td>
               <td className="py-2 w-60 px- border-b">
                 <img className="w-10 h-10 rounded-full" src={user.photo} alt={user.name} />
               </td>
               <td className="py-2 w-60 border-b px-5">{user.name}</td>
               <td className="py-2 w-60 border-b">{user.email}</td>
               <td className="py-2 w-60 border-b">
                 <button 
                   className="mt-1 ml-1 py- rounded-full px-4 text-white bg-green-500 hover:bg-green-600 translate-color"
                   // value={user.role}
                   onClick={(e) => handleStatusChange(user, e.target.value)}
                   value="Approved"
                 >
                Approved
                 </button>
               </td>
               <td className="py-2 w- border-b ">
                 <button
                   onClick={() => handleStatusChange(user)}
                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
                   value="Block"
                 >
                   Block
                 </button>
               </td>
             </tr>
              )
              )}
              {/* : <div className="w-full flex mx-auto justify-center">
               <img className="w-1/2 mx-auto" src="/no-data.png" alt="" />
              </div> */}
            </tbody>
          </table>
        </div>
      </div>
</div>
    );
};

export default PendingUser;
