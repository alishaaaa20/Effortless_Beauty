import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL, token } from "../utils/config";

const Success = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get("data");

    if (encodedData) {
      const verifyTransaction = async () => {
        try {
          const res = await fetch(`${BASE_URL}/bookings/verify-transaction`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ encodedResponse: encodedData }),
          });

          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Service unavailable.");
          }

          setVerificationResult(data);
        } catch (error) {
          setError(error.message);
        }
      };

      verifyTransaction();
    } else {
      setError("No transaction data found");
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {verificationResult ? (
          <>
            <h1 className="text-4xl font-bold text-green-500">Success</h1>
            <p className="text-lg text-gray-500">
              Your payment was successful.
            </p>
            <pre className="text-left">
              {JSON.stringify(verificationResult, null, 2)}
            </pre>
          </>
        ) : error ? (
          <>
            <h1 className="text-4xl font-bold text-red-500">Error</h1>
            <p className="text-lg text-gray-500">{error}</p>
          </>
        ) : (
          <p className="text-lg text-gray-500">Verifying transaction...</p>
        )}
      </div>
    </div>
  );
};

export default Success;
