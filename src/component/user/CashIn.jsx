import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const CashInPage = () => {
  const [amount, setAmount] = useState('');
  const [agent, setAgent] = useState('');
  const [sender, setSender] = useState('');
  const { email, pin } = useContext(AuthContext);


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

  }, [email]);



  const handleCashIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/cashin", {
        amount: parseFloat(amount),
        email,
        agentNumber: agent
      });
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Cash in request sent successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        setAmount('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to send cash in request',
          text: response.data.message
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.'
      });
      console.error('Error sending cash in request:', error);
    }

    try {
        // Send money request
        const response = await axios.post("http://localhost:5000/transections", {
          senderNumber: sender.number,
          senderEmail: sender.email,
          agentEmail: sender.email,
          agentNumber: agent,
          amount: parseFloat(amount),
          time: new Date(),
           type: 'cashIn'
        });
    }
    catch (error) {
      console.error('Error sending transection:', error);
    }  
  };

  return (
    <div className="flex mt-10 items-center justify-center bg-gray-00 lg:px-20 px-5">
      <div className="bg-gray-0  p-8 rounded-lg shadow px-5 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Cash In</h2>
        <form onSubmit={handleCashIn} className="space-y-4">
          <div>
            <label className="block font-bold">Agent Number</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              placeholder="Enter Agent Number"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold">Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-gray-800 transition duration-200"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashInPage;
