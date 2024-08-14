import React from "react";
import LogoutButton from "../../pages/LogOute";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {

    const axiosPublic = useAxiosPublic();

  
    // Fetch all users
    const { data: users = [],  } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosPublic.get("/all-users");
        return res.data;
      },
    });

    console.log(users);

    // Fetch all agents
    const { data: agents = [],  } = useQuery({
      queryKey: ["agents"],
      queryFn: async () => {
        const res = await axiosPublic.get("/all-agents");
        return res.data;
      },
    });
    const { data: trans = [],  } = useQuery({
      queryKey: ["admin-trans"],
      queryFn: async () => {
        const res = await axiosPublic.get("/trans");
        return res.data;
      },
    });

     // Fetch all pending-users
    const { data: pendingUser = [],  } = useQuery({
      queryKey: ["pending-users"],
      queryFn: async () => {
        const res = await axiosPublic.get("/all-users-pending");
        return res.data;
      },
    });
    // Fetch all pending agents
    const { data: pendingAgent = [],  } = useQuery({
      queryKey: ["pending-agents"],
      queryFn: async () => {
        const res = await axiosPublic.get("/all-agent-pending");
        return res.data;
      },
    });

    // Fetch all block
    const { data: block = [],  } = useQuery({
      queryKey: ["block"],
      queryFn: async () => {
        const res = await axiosPublic.get("/all-user-block");
        return res.data;
      },
    });

console.log(agents);

  return (
    <div className="mt-5 hidden lg:block">
      <div className="mx-auto justify-center bg-gray min-h-screen">
  
        <div className="grid grid-cols-3 gap-6 justify-center justify-items-center max-w-[1280px] mx-auto px-3">
          <Link
            to="/admin-dashboard/admin/all-users"
            className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-md bg-gray-100 text-pink-500 font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Personal <span className="">{users?.length}</span>
          </Link>
          <Link
            to="/admin-dashboard/admin/all-agent"
            className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-lg bg-gray-100 text-pink-500  font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Agent <span className="">{agents.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/transection" className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-lg bg-gray-100 text-pink-500  font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Transection <span className="">{trans.length}</span>
          </Link>
          <Link
            to="/admin-dashboard/admin/pending-users"
            className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-lg bg-gray-100 text-pink-500  font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Pending Users <span className="">{pendingUser.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/pending-agent" className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-lg bg-gray-100 text-pink-500  font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Pending Agent <span className="">{pendingAgent.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/block" className="lg:w-80 w-full h-28 p-3 hover:shadow-pink-500 shadow rounded-lg bg-gray-100 text-pink-500  font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Block Coustomer <span className="">{block.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
