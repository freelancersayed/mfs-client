import React from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { Typewriter } from "react-simple-typewriter";
import { FaFacebook, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import { FaT } from "react-icons/fa6";
// import 'react-simple-typewriter/dist/index.css';
import "../index.css";

const LandingPage = () => {
  return (
    <div className="">
      <div className="w-full shadow-sm bg-pink-600 fixed z-50  -mt-16 md:-mt-16 md:px-2 px-2 py-3">
     <div className="px-4 md:-[680px] mx-auto flex justify-between items-center">
    <h1 className="text-white text-2xl font-bold italic"><span className="text-4xl font-serif">E-</span>Cash</h1>
        <div className="flex gap-5 text-white text-sm md:text-lg">
          <Link to="/login" className="">
            LOGIN
          </Link>
          {/* <p className="text-gray-500">or</p> */}
          <Link to="/reg-dashboard/us-register" className="">
            REGISTER
          </Link>
        </div>
     </div>
      </div>
{/* <div className="min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://media.licdn.com/dms/image/v2/D4E12AQG79M4wF5XqyA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698148528241?e=1730332800&v=beta&t=Ql-wWepug7vEuzF_0Ddo1bl04C4dZ2hWyywvdz6OVNQ')] ">
<div className="min-h-screen w-full bg-black opacity-80 py-16">

</div>
</div> */}

<div className=" mx-auto">

<div className="bg-gray-700 text-white">
<section className="max-w-[1280px] md:h-[600px] mx-auto shado font items-center text-xl gap-4 md:mt-16 mt-16 px-8 py-4 flex md:flex-row flex-col-reverse">
        <div className=" space-y-3 w-full flex-1 p-4">
                    <p className="">
            <span className="text-teal-500 text-3xl">Welcome! </span>
            Your financial transactions are now easier, faster and safer. In our mobile financial application you will find advanced features like Cashin, Cashout, and SendMoney, which will make your daily financial activities more convenient.
          </p>
          <h1 className="font-bold">Features</h1>
          <div className="ml-4 space-y-3">
            <p>
              <span className="font-bold text-green-500">CashIn: </span> easily
              Add money to your account, anytime, from anywhere.
            </p>
            <p>
              <span className="font-bold text-red-500">CashOut:</span> easily and
              Withdraw money from your account securely.
            </p>
            <p>
              {" "}
              <span className="font-bold text-pink-500">SendMoney:</span>{" "}
              Send money to others in an instant—one click away
              Make your transaction.
            </p>
          </div>
        </div>

        <div className="px-4 md:py-10 w-full mx-auto gap-5 md:flex-1 bg-cover md:h-full overflow-hidden ">
          {/* <div className=' overflow-hidden  space-y-5 w-full'>           
<h1 className="text-teal-500 font-bold text-center text-4xl">
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
      </div> */}

          <img
            className="md:w-full mx-auto"
            src="https://www.pay10.com/img/5%20safest/Blog%20Inside%20Image%20-%205%20Best%20Electronic%20Fund%20Transfer%20In%20India.png"
            alt=""
          />
        </div>
      </section>
</div>

<div className="bg-gray-600 text-white">
<section className="max-w-[1280px] py-4  mx-auto shado font  lg:flex items-center gap-4  px-8">

<div className="px-4 w-full mx-auto gap-5 flex-1 bg-cover h-full overflow-hidden">
    <img
      className="md:w-full w-80 mx-auto"
      src="https://cdn-icons-png.flaticon.com/512/6897/6897629.png"
      alt=""
    />
  </div>

  <div className=" space-y-3 w-full flex-1 p-4 py-10">
    <p className="text-justify">
    <span className="text-teal-500 text-3xl">SendMoney</span> in one click Totally free
    </p>

    <div className="space-y-3">
      <p>
      Sign in to easily send money from your account to another account, and send as much money as you want at any time for free.
      </p>

    </div>
  </div>
</section>
</div>

<div className="bg-gray-700 text-white">
<section className="max-w-[1280px] py-4 mx-auto font flex md:flex-row sm:flex-col-reverse items-center gap-4  px-8 text-sm">
  <div className=" space-y-3 w-full  p-4 py-10">
    <p className="text-justify">
    <span className="text-teal-500 text-3xl">CashOut</span>
       in one click
    </p>

    <div className=" space-y-3">
      <p>
      Cashout easily from your preferred agent anytime from anywhere at low cost.
      </p>
    </div>
  </div>

  <div className="px-4 md:w-full  mx-auto gap-5  bg-cover h-full overflow-hidden">
    <img
      className="w-72 md:w-96"
      src="https://www.top10sportsbettingsites.net/wp-content/uploads/2020/01/1521079793864.png"
      alt=""
    />
  </div>
</section>
</div>
</div>

<footer className="h-44 w-full bg-gray-950 text-white py-4 text-center">
<div className=" footer-title text-center">
<h1>e-Cash</h1>
</div>
<div className="flex gap-4 justify-center my-5">
<FaFacebook></FaFacebook>
<FaLinkedin></FaLinkedin>
<FaTwitter></FaTwitter>
<FaPhone></FaPhone>
</div>
<hr className="w-5/6 mx-auto" />
<div className="py-4">
  <p>Copyright by sayed-2024</p>
</div>
</footer>
    </div>
  );
};

export default LandingPage;
