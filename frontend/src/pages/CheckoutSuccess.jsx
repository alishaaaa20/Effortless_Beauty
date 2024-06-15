import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <h1 className="text-4xl font-bold text-center">Payment Successful!</h1>
        <p className="text-lg text-center">Thank you for your purchase.</p>
        <Link
          to="/"
          className="px-12 bg-buttonBgColor text-white font-semibold"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
