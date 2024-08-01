import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const SendMoney = () => {
  const [sender, setSender] = useState("");
  const [receiverNumber, setReceiverNumber] = useState();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [fee, setFee] = useState("");
  // const [email, setEmail] = useState('');

  const { email } = useContext(AuthContext);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]); // Checking fetched data
          setSender(data[0]); // Setting user data in state
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    if (receiverNumber) {
      fetch(`http://localhost:5000/user-number/${receiverNumber}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data[0]); // Checking fetched data
          setUser(data[0]); // Setting user data in state
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }



    if (amount > 100) {
      setFee(5);
      return
    } else {
      setFee(0);
    }
  }, [receiverNumber]); // Only run useEffect when email changes


  console.log(user?.role);

  const handleSendMoney = async (e) => {
    e.preventDefault();

  
    try {
      // Send money request
      const response = await axios.post("http://localhost:5000/transections", {
        senderNumber: sender.number,
        senderEmail: sender.email,
        receiverNumber,
        receiverEmail: user?.email,
        amount: parseFloat(amount),
        time: new Date(),
         type: 'sendMoney'
      });
  
      if (response?.data?.insertedId) {
        console.log("Money post Successfully");
      } else {
        console.log("Money post failed");
      }
  
      // Update sender balance
      try {
        await axios.put(`http://localhost:5000/amount/${sender?._id}`, {
          balance: sender.balance - parseFloat(amount) - parseFloat(fee),
          email: sender.email,
          pin,
        }
      );
      } catch (error) {
        console.error("Error updating sender balance:", error);
        throw new Error("Error updating sender balance");
      }

           // Update receiver balance
           try {
            await axios.put(`http://localhost:5000/amount/${user?._id}`, {
              balance: user?.balance + parseFloat(amount),
            });
          } catch (error) {
            console.error("Error updating receiver balance:", error);
            throw new Error("Error updating receiver balance");
          }
      
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: {message},
            showConfirmButton: false,
            timer: 3000
          });
  
    } catch (error) {
      setMessage("Money transfer failed");
      console.error("Error sending money:", error);
    }
  };
  

  console.log(pin);
  console.log(sender?.email);

  return (
    <div className="flex items-center justify-center bg-gray-100 mt-5">
      <div className="w-full  bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-400">Send Money</h1>
        <form onSubmit={handleSendMoney} className="grid grid-cols-2 gap-10">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Receiver Number
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={receiverNumber}
              onChange={(e) => setReceiverNumber(e.target.value)}
              required
              placeholder="type your phone number"
            />
            <p className="text-red">{user?.role !== 'User' ? <p className="text-red-500">Not a valid user</p> :<p className="h-6"></p>}</p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Receiver Name
            </label>
            <input
              type="text"
              disabled
              className="w-full p-2 border border-gray-300 rounded-md "
              value={user?.role === 'User' ? user.name :  '--'} 
              onChange={(e) => setReceiverNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Amount
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            placeholder="Enter amount"
            />
            <p className="text-red-500">{amount < 50 ? <>Minimum transaction amount is 50. BDT</>: null}</p>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Your Password
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setPin(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <p className="text-red-500">{pin.length < 5 || pin.length > 5 ? <>Password should be at least 5 digits long.</>: <p className="h-6"></p>}</p>
          </div>
          <button
            type="submit"
            className="w-full col-span-2 bg-[#ff1bc6] text-white btn rounded-md"
            disabled={user?.role !== 'User' || amount < 50 || pin.length <5}
          >
            Send Money
          </button>
          <div className="mt-4 text-center text-green-500">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
