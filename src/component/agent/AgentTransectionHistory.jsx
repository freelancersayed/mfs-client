
import  { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';

const AgentTransHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const { email } = useContext(AuthContext);
  
    useEffect(() => {
      if (email) {
        axios.get(`http://localhost:5000/transections/${email}`)
          .then(response => setTransactions(response.data))
          .catch(error => console.error('Error fetching transactions:', error));
      }
 
    }, [email]);
    console.log(transactions);
    console.log(email);
    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Transaction History</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w- py-3 px-4 text-left uppercase font-semibold text-sm">Si</th>
                  <th className="w-1/3 py-3 px-4 text-left uppercase font-semibold text-sm">Transection Id</th>
                  <th className="w-1/3 py-3 px-4 text-left uppercase font-semibold text-sm">Number</th>
                  <th className="w-1/3 py-3 px-4 text-left uppercase font-semibold text-sm">Amount</th>
                  <th className="w-1/3 py-3 px-4 text-left uppercase font-semibold text-sm">Type</th>
                  <th className="w-1/3 py-3 px-4 text-right uppercase font-semibold text-sm">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {transactions.map((transaction, index) => (
             <tr key={transaction._id}>
             
             <td className="px-5 w-10 py-5 border-b border-gray-200 bg-white text-sm">
               {index + 1}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {transaction._id}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {transaction.receiverNumber}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
               {transaction.amount}
             </td>
             <td className={transaction.type === "cashIn" ? "text-green-500 px-5 py-5 border-y border-gray-200 bg-white text-sm": transaction.type === "cashOut" ? "text-red-500 px-5 py-5 border-y border-gray-200 bg-white text-sm":null}>
               {transaction.type}
             </td>
             <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
               {new Date(transaction.time).toLocaleString()}
             </td>
           </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
export default AgentTransHistory;