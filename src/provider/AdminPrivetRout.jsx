import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation,  } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


const AdminPrivetRout = ({children}) => {
    const [user, setUser] = useState(null); // Initialize user state
    // const [loading, setLoading] = useState(true);
    const {email, loading} = useContext(AuthContext)
    const location = useLocation();

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data[0]); // Checking fetched data
                    setUser(data[0]); // Setting user data in state
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [email]); // Only run useEffect when email changes

    // useEffect(() => {
    //     // 2 সেকেন্ড পরে লোডিং শেষ হবে
    //     const timer = setTimeout(() => {
    //       setLoading(false);
    //     }, 2000);
    
    //     // ক্লিনআপ ফাংশন, যখন কম্পোনেন্ট আনমাউন্ট হবে
    //     return () => clearTimeout(timer);
    //   }, []);

    if(!email){
   return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }
    if(!user){
    return <div className='w-full mx-auto items-center justify-center flex'><span className="loading loading-bars loading-lg min-h-screen"></span></div>
    }

if(user?.role === 'Admin'){
    return children;
}
return <div><img src="/sorry.png" alt="" /></div>
// return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminPrivetRout;