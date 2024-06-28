import React, { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import {
  FaUserPlus,
  FaUserLargeSlash,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const AreaCards = () => {
  const [artistCounts, setArtistCounts] = useState({
    approved: 0,
    pending: 0,
    cancelled: 0,
    total: 0,
  });
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchArtistCounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/artists/status/counts"
        );
        const data = await response.json();
        console.log(data, "artist counts");
        if (data.success) {
          setArtistCounts(data.data);
        } else {
          console.error("Failed to fetch artist counts");
        }
      } catch (error) {
        console.error("Error fetching artist counts:", error);
      }
    };

    fetchArtistCounts();
  }, []);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/users/total"
        );
        const data = await response.json();
        console.log(data, "total customers");
        if (data.success) {
          setTotalCustomers(data.data);
        } else {
          console.error("Failed to fetch total customers");
        }
      } catch (error) {
        console.error("Error fetching total customers:", error);
      }
    };

    fetchTotalCustomers();
  }, []);

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Link to="/artists">
          <div className="rounded-lg bg-white border-l-4 border-primaryColor p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-out">
            <div>
              <h2 className="text-primaryColor text-lg font-bold mb-2">
                Total Artists
              </h2>
              <h1 className="text-2xl font-bold text-gray-600">
                {artistCounts.total}
              </h1>
            </div>
            <FaUserPlus size={32} className="text-primaryColor" />
          </div>
        </Link>
        <Link to="/artists">
          <div className="rounded-lg bg-white border-l-4 border-green-600 p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-out">
            <div>
              <h2 className="text-green-600 text-lg font-bold mb-2">
                Approved Artists
              </h2>
              <h1 className="text-2xl font-bold text-gray-600">
                {artistCounts.approved}
              </h1>
            </div>
            <FaUserCheck size={32} className="text-green-600" />
          </div>
        </Link>
        <Link to="/artists">
          <div className="rounded-lg bg-white border-l-4 border-yellow-400 p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-out">
            <div>
              <h2 className="text-yellow-400 text-lg font-bold mb-2">
                Pending Artists
              </h2>
              <h1 className="text-2xl font-bold text-gray-600">
                {artistCounts.pending}
              </h1>
            </div>
            <FaUserClock size={32} className="text-yellow-400" />
          </div>
        </Link>
        <Link to="/artists">
          <div className="rounded-lg bg-white border-l-4 border-red-600 p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-out">
            <div>
              <h2 className="text-red-600 text-lg font-bold mb-2">
                Rejected Artists
              </h2>
              <h1 className="text-2xl font-bold text-gray-600">
                {artistCounts.cancelled}
              </h1>
            </div>
            <FaUserLargeSlash size={32} className="text-red-600" />
          </div>
        </Link>
        <Link to="/customers">
          <div className="rounded-lg bg-white border-l-4 border-black p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-out">
            <div>
              <h2 className="text-black text-lg font-bold mb-2">
                Total Customers
              </h2>
              <h1 className="text-2xl font-bold text-gray-600">
                {totalCustomers}
              </h1>
            </div>
            <FaUserPlus size={32} className="text-black" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default AreaCards;
