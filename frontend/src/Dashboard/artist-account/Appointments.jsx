import React from "react";
import { formateDate } from "../../utils/formateDate";

const Appointments = ({ appointments }) => {
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
            Service Price
          </th>
          <th scope="col" className="px-6 py-3">
            Booked on
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
              {item.isPaid && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2">
                    Paid
                  </div>
                </div>
              )}
              {!item.isPaid && (
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-2">
                    Not Paid
                  </div>
                </div>
              )}
            </td>
            <td className="px-6 py-4">Rs. {item.user.ticketPrice}</td>
            <td className="px-6 py-4">
              {/* {new Date(item.createdAt).toDateString()} */}
              {formateDate(item.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
