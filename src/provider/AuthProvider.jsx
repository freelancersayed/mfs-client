import { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(localStorage.getItem('user-email') || '');
    const [number, setNumber] = useState(localStorage.getItem('user-number') || '');

    useEffect(() => {
        localStorage.setItem('user-email', email);
        localStorage.setItem('user-number', number);
    }, [email, number]);

    const logout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-email');
        setUser(null);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "LogOut Success full!",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            window.location.href = '/'; // Navigate to login page
        });
    };

    const authInfo = {
        user,
        loading,
        setUser,
        logout,
        email,
        setEmail,
        number,
        setNumber,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
