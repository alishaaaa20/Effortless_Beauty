import React from "react";

const Error = ({ errMessage }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-red-500 text-2xl">
        {errMessage ? errMessage : "Something went wrong!"}
      </h1>
    </div>
  );
};

export default Error;
