import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config";

const OTPCode = () => {
  const email = new URLSearchParams(window.location.search).get("email");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/verify`, {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, otp: event.target[0].value }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success(result.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="container max-w-md mt-20">
      <h1 className="text-lg font-medium">
        Enter the OTP code sent to your email address
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="items-center text-center">
          <input
            type="text"
            placeholder="Enter OTP code"
            className="border border-gray-300 p-2 w-full mt-8"
          />
        </div>
        <button className="bg-primaryColor text-white p-2 w-full mt-8 mb-10 ">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPCode;
