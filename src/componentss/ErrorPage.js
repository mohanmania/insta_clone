import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      
     
      <h3 className="mt-4 text-lg font-semibold text-gray-700 text" >
        Oops! Something went wrong. Please try again later.
      </h3>

     
      <button  style={{color:"red"}}
        onClick={() => navigate("/home")}
        className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}
