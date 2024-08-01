import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PendingCashInRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);


  const {email} = useContext(AuthContext);


  useEffect(() => {
        fetch(`http://localhost:5000/user/${email}`)
          .then(res => res.json())
          .then(data => {
            // console.log(data[0]); // Checking fetched data
            setUsers(data[0]); // Setting user data in state
          })
          .catch(error => console.error('Error fetching user data:', error));
          
  }, []);


  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pending-cashin-requests/${users.number}`);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching pending requests');
        setLoading(false);
      }
    };

    fetchPendingRequests();
    const interval = setInterval(() => {
      fetchPendingRequests(); // Fetch data every 5 minutes (300000 ms)
    }, 300000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [users]);

  // console.log(requests);

  const handleApprove = async (request) => {
    try {
      // Fetch the user by email
      const userResponse = await axios.get(`http://localhost:5000/user/${request.userEmail}`);
      const user = userResponse.data[0];

      // Update the user's balance
      await axios.put(`http://localhost:5000/agent-cashin-approved/${request.userId}`, {
        balance: user?.balance +  parseFloat(request?.amount)
      });

      toast.success('Cash In Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      // Optionally, remove the approved request from the state
      // setRequests(requests.filter(req => req._id !== request._id));
    } catch (error) {
      console.error("Error updating status:", error);
    }

          // Update sender balance
          try {
                // Fetch the user by email
      const userResponse = await axios.get(`http://localhost:5000/user/${email}`);
      const agent = userResponse.data[0];

      // console.log(agent.balance);
      // console.log(parseFloat(request.amount));

            await axios.put(`http://localhost:5000/amount/${agent?._id}`, {
              balance: agent.balance - parseFloat(request?.amount)
            }
          );
          } catch (error) {
            console.error("Error updating sender balance:", error);
            throw new Error("Error updating sender balance");
          }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/agent-cashin-reject/${id}`,{status: "Reject"});

      toast.warn('Cash In Rejected!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Pending Cash-In Requests</h1>
      {requests.length === 0 ? (
        <div>No pending requests.</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead className='bg-gray-800 rounded text-white'>
            <tr className=''>
              <th className="py-2">User Number</th>
              <th className="py-2">Amount</th>
              <th className="py-2 ">Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border w-52 text-center px-4 py-2  ">{request?.userNumber}</td>
                <td className="border w-52 text-center px-4 py-2 ">{request.amount}</td>
                <td className="border w-52 text-center px-4 py-2 ">{new Date(request.createdAt).toLocaleString()}</td>
                <td className="border w-52 text-center px-4 py-2   justify-items-end-end">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 mr-5"
                    onClick={() => handleApprove(request)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </div>
  );
};

export default PendingCashInRequests;
