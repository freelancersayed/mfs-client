import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Alluser = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [users, setUser] = useState(searchTerm);
  // const axiosPublic = useAxiosPublic();
  const axiosPublic = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const {  refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-users");
      setUser(res.data);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(users);

  
  // Fetch users based on search term
  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await axiosPublic.get(`/search-users?searchTerm=${searchTerm}`);
          setUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      refetch();
    }
  }, [searchTerm, axiosPublic, refetch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };




  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      await axiosPublic.put(`/update-role/${userId}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.success("Chang User role!")
    },
    onError: (error) => {
      console.error("Error updating role:", error);
    },
  });

  const handleRoleChange = (user, newRole) => {
    updateRoleMutation.mutate({ userId: user?._id, newRole });
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
        await axios.put(`https://mfs-server-xi.vercel.app/update-status/${user._id}`, {status: newStatus});


        refetch(); // Refresh the users data
    } catch (error) {
        console.error("Error updating status:", error);
    }
};


  return (
    <div className="container  mx-auto pt- bg-gray-20 pb-">
        <div className="text-center bg[#ff1bc6] py-5 mb-5 text-black text-2xl">All Users</div>
      <div className="w-full mb-5 px-4 flex items-center relative">
        <FaSearch className="ml-2 absolute text-[#ff24d0] text-sm" />
        <input
          className="pl-8 lg:w-80 py-1 rounded-2xl justify-end bg-[hsl(0,100%,100%)] border border-[#ff24d0] outline-0 flex justify-end"
          type="text"
          placeholder="Search user"
          // value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray- text-white ">
              <tr className=" bg-gray-900">
                <th className="py-2 lg:w-60 text-left border-b px-5">Serial</th>
                <th className="py-2 lg:w-60 text-left  border-b">Number</th>
                <th className="py-2 lg:w-60 text-left  border-b">Photo</th>
                <th className="py-2 lg:w-60 text-left  border-b">Name</th>
                <th className="py-2 lg:w-60 text-left  border-b">Email</th>
                <th className="py-2 lg:w-60 text-left  border-b">Change Role</th>
                <th className="py-2  text-left  border-b px-5">Action</th>
              </tr>
            </thead>
          </table>
          <table className="min-w-full bg-white shadow- px-2  rounded">
            <tbody className="">
              {users.length >0 ?( users.map((user, index) =>  (
            
               <tr key={user._id} className="hover:bg-gray-100 flex">
               <td className="py-2 lg:w-60 border-b pl-5">{index + 1} </td>
               <td className="py-2 lg:w-60 border-b px-">{user.number} </td>
               <td className="py-2 lg:w-60 border-b px-">
                 <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-erUOQght_VvS9h9OS_0J6wvFFIQHtIRgGjv-e1RBZ3fP02XlcM59WPkFb9cN-0U2uik&usqp=CAU" alt="" />
               </td>
               <td className="py-2 w-60 border-b ">{user.name}</td>
               <td className="py-2 w-60 border-b">{user.email}</td>
               <td className="py-2 w-60 border-b">
                 {user.role}
                 <select
                   className="w-4 mt-1 ml-1"
                   // value={user.role}
                   onChange={(e) => handleRoleChange(user, e.target.value)}
                 >
                   <option value="Agent">User</option>
                   <option value="Agent">Agent</option>
                 </select>
               </td>
               <td className="py-2 border-b pr- ">
                 <button
                   onClick={(e) => handleStatusChange(user, e.target.value)}
                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
                   value="Block"
                 >
                   Block
                 </button>
               </td>
             </tr>
              )
              ) ):
              
              <p className="text-xl flex items-center gap-4 py-4 px-5 text-gray-500"><FaSearch></FaSearch> No results found</p>
              
              }
              {/* : <div className="w-full flex mx-auto justify-center">
               <img className="w-1/2 mx-auto" src="/no-data.png" alt="" />
              </div> */}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Alluser;
