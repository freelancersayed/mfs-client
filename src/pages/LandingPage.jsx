import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import { Typewriter } from 'react-simple-typewriter';
// import 'react-simple-typewriter/dist/index.css';

const LandingPage = () => {
    return (
        <div className='bg-gray-100 min-h-screen '>
            <div className=' overflow-hidden py-10 space-y-5'>
                <img className='w-96 mx-auto bg-cover' src="/ecash.png" alt="" />
                {/* <h1 className='text-teal-500 font-bold text-center text-7xl animate__swing'>WellCome to E-Cash</h1> */}
        <h1 className="text-red-500 font-bold text-center text-4xl">
        <Typewriter
          words={['Welcome to our site', 'Explore Oure Syestem', 'Enjoy your stay!']}
          loop={5}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
                
            </div>
<div className="p-5 lg:flex w-full mx-auto gap-5 justify-center items-center ">

<Link to="/reg-dashboard/us-register" className="w-96 lg:m-0 sm:mx-auto h-20 shadow-sm bg-pink-500 text-white hover:shadow-[#9683ff] border font-bold items-center flex justify-center text-xl rounded-md hover:translate-y-1 hover:shadow-xl cursor-pointer">
Register Now
</Link>
<p className='text-xl text-center'>or</p>
<Link to="/login" className="w-96 h-20 lg:m-0 sm:mx-auto shadow-sm bg-pink-500 text-white hover:shadow-[#9683ff] border font-bold items-center flex justify-center text-xl rounded-md hover:translate-y-1 hover:shadow-xl cursor-pointer">
Login
</Link>

</div>
        </div>
    );
};

export default LandingPage;