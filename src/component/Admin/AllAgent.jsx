import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
// import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";

const AllAgent = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [agents, setAgent] = useState(searchTerm);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // Fetch all users
  const { refetch } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-agents");
      setAgent(res.data);
      return res.data;
    },
  });

  console.log(agents);

  // Fetch users based on search term
  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await axiosPublic.get(`/search-agents?searchTerm=${searchTerm}`);
          setAgent(response.data);
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

  // Delete user mutation
  // const deleteUserMutation = useMutation({
  //   mutationFn: async (userId) => {
  //     await axiosPublic.delete(`/delete-agent/${userId}`);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("users");
  //     toast.success("User deleted successfully!");
  //   },
  //   onError: (error) => {
  //     console.error("Error deleting user:", error);
  //     toast.error("Error deleting user.");
  //   },
  // });

  // const handleDelete = (user) => {
  //   Swal.fire({
  //     title: `Are you sure you want to delete user: ${user.name}?`,
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteUserMutation.mutate(user._id);
  //     }
  //   });
  // };

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
    updateRoleMutation.mutate({ userId: user, newRole });
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
        await axios.put(`http://localhost:5000/update-status/${user._id}`, {status: newStatus});


        refetch(); // Refresh the users data
    } catch (error) {
        console.error("Error updating status:", error);
    }
};

  return (
    <div className=" container mx-auto pt- bg-gray-20 pb-">
        <div className="text-center  py-5 mb-5 text-black text-2xl">All Agent</div>
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
                <th className="py-2 w-60 text-left border-b px-5">Serial</th>
                <th className="py-2 w-60 text-left  border-b">Number</th>
                <th className="py-2 w-60 text-left  border-b">Photo</th>
                <th className="py-2 w-60 text-left  border-b">Name</th>
                <th className="py-2 w-60 text-left  border-b">Email</th>
                <th className="py-2 w-60 text-left  border-b">Role</th>
                <th className="py-2  text-left  border-b px-5">Action</th>
              </tr>
            </thead>
          </table>
          <table className="min-w-full bg-white shadow- px-2  rounded">
            <tbody className="">
              {agents.length > 0 ? agents.map((user, index) =>  (
            
               <tr key={user._id} className="hover:bg-gray-100 flex">
               <td className="py-2 lg:w-52 border-b px-5">{index + 1} </td>
               <td className="py-2 lg:w-60 border-b px-5">{user.number} </td>
               <td className="py-2 lg:w-60 border-b px-5">
                 <img className="w-10 h-10 rounded-full" src={user.photo} alt="" />
               </td>
               <td className="py-2 w-60 border-b px-5">{user.name}</td>
               <td className="py-2 w-60 border-b">{user.email}</td>
               <td className="py-2 w-52 border-b">
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
               <td className="py-2 border-b pl-10 ">
                 <button
                   onClick={() => handleStatusChange(user)}
                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-500"
                   value="Block"
                 >
                   Block
                 </button>
               </td>
             </tr>
              ))
              :
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

export default AllAgent;
