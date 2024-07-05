import React from "react";

const Failure = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Failure</h1>
        <p className="text-lg text-gray-500">
          Your payment was not successful.
        </p>
        <p className="text-lg text-gray-500">Please try again.</p>
      </div>
    </div>
  );
};

export default Failure;
