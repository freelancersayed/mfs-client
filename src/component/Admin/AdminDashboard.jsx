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
        {/* <div className="bg-[#ff1bc6] flex justify-between py-2 items-center shadow mb-10 lg:px-10 px-2">
          <div className="flex items-center gap-2">
            <img
              className="w-16 h-16 border rounded-full"
              src="/studentLogo.png"
              alt=""
            />
            <h1 className="lg:text-5xl text-2xl text-white font-bold">
              Admin Dashboard
            </h1>
          </div>
          <div>
            <LogoutButton></LogoutButton>
          </div>
        </div> */}
        <div className="grid grid-cols-3 gap-6 justify-center justify-items-center max-w-[1280px] mx-auto px-3">
          <Link
            to="/admin-dashboard/admin/all-users"
            className="lg:w-80 w-full h-28 p-3 hover:border shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Personal <span className="">{users.length}</span>
          </Link>
          <Link
            to="/admin-dashboard/admin/all-agent"
            className="lg:w-80 w-full h-28 p-3 hover:border-2 shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Agent <span className="">{agents.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/transection" className="lg:w-80 w-full h-28 p-3 hover:border-2 shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Transection <span className="">{trans.length}</span>
          </Link>
          <Link
            to="/admin-dashboard/admin/pending-users"
            className="lg:w-80 w-full h-28 p-3 hover:border-2 shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col"
          >
            Pending Users <span className="">{pendingUser.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/pending-agent" className="lg:w-80 w-full h-28 p-3 hover:border-2 shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Pending Agent <span className="">{pendingAgent.length}</span>
          </Link>
          <Link to="/admin-dashboard/admin/block" className="lg:w-80 w-full h-28 p-3 hover:border-2 shadow rounded-lg bg-gray-800 text-white font-bold text-center lg:text-3xl text-xl justify-center flex flex-col">
            Block Coustomer <span className="">{block.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
