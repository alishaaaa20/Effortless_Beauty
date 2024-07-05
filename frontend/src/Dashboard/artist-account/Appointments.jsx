import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../utils/config";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/bookings/appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch appointments.");
        }
        setAppointments(data.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Location
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Partial Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Service Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on
          </th>
          <th scope="col" className="px-6 py-3">
            Time Slot
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center px-6 py-4 whitespace-nowrap text-gray-900"
            >
              <img
                src={item.user.photo}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <div className="pl-3">
                <div className="text-base font-medium">{item.user.name}</div>
                <div className="text-normal text-gray-500">
                  {item.user.email}
                </div>
              </div>
            </th>
            <td className="px-6 py-4">{item.user.location}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  Paid
                </div>
              ) : item.isPartiallyPaid ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                  Partially Paid
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  Not Paid
                </div>
              )}
            </td>
            <td className="px-6 py-4">Rs. {item.payment.amountPaid}</td>
            <td className="px-6 py-4">Rs. {item.ticketPrice}</td>
            <td className="px-6 py-4">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">{item.timeSlot}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
