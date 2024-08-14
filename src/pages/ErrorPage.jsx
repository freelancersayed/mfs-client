import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error 404</h1>
        <p className="text-xl mb-4">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
