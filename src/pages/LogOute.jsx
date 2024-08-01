import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const LogoutButton = () => {
    const { logout, } = useContext(AuthContext);


    return (
        <button
            onClick={logout}
            className="bg-red- shadow border-[#ff37b2] border hover:shadow-lg text-white font-bold px-4 py-1 rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
