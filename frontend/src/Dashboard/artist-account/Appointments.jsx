import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../utils/config";
import convertTime from "../../utils/convertTime.js";

const Appointments = ({ artistId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bookings/appointments?artistId=${artistId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  }, [artistId]);

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-4 py-2 ">
            Name
          </th>
          <th scope="col" className="px-4 py-2 ">
            Location
          </th>
          <th scope="col" className="px-4 py-2 ">
            Payment
          </th>
          <th scope="col" className="px-4 py-2 ">
            Paid Amount
          </th>
          <th scope="col" className="px-4 py-2 ">
            Service Price
          </th>
          <th scope="col" className="px-4 py-2 ">
            Booked on
          </th>
          <th scope="col" className="px-4 py-2 w-1/4">
            Time Slot
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id} className="hover:bg-gray-100">
            <th
              scope="row"
              className="flex items-center px-4 py-2 whitespace-nowrap text-gray-900"
            >
              <img
                src={item.user.photo}
                alt="user"
                className="w-10 h-8 rounded-full object-cover"
              />
              <div className="pl-3">
                <div className="text-base font-medium truncate w-32">
                  {item.user.name}
                </div>
                <div className="text-normal text-gray-500 truncate w-32">
                  {item.user.email}
                </div>
              </div>
            </th>
            <td className="px-4 py-2 truncate w-32">{item.user.location}</td>
            <td className="px-4 py-2">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  Paid
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                  Not Paid
                </div>
              )}
            </td>
            <td className="px-4 py-2">Rs. {item.payment.amountPaid}</td>
            <td className="px-4 py-2">Rs. {item.ticketPrice}</td>
            <td className="px-4 py-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">
              {item.timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="text-[12px] leading-6 text-textColor font-semibold"
                >
                  {slot.date}: {convertTime(slot.startingTime)} -{" "}
                  {convertTime(slot.endingTime)}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
