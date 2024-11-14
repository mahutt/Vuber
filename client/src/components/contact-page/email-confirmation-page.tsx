import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleGoBack = () => {
    navigate('/'); // Redirects to the Home page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-sm">
        <div className="text-4xl text-green-600 mb-6">✔️</div>
        <h1 className="text-3xl text-green-700 mb-6">Email Sent Successfully!</h1>
        <p className="text-gray-800 text-lg mb-6">
          Your email has been successfully sent. We will get back to you shortly.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-green-600 text-white py-3 px-6 rounded-md text-lg hover:bg-green-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default EmailConfirmation;
