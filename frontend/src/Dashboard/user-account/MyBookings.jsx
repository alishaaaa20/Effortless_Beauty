import React from "react";
import useFetchData from "../../hooks/useFetch";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../utils/config";
import { formateDate } from "../../utils/formateDate";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
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
                  <td className="flex items-center px-6 py-4 whitespace-nowrap text-gray-900">
                    <img
                      src={item.artist.photo}
                      alt="artist"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="pl-3">
                      <div className="text-base font-medium">
                        {item.artist.name}
                      </div>
                      <div className="text-normal text-gray-500">
                        {item.artist.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.artist.location}</td>
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
                  <td className="px-6 py-4">Rs. {item.partialPaymentAmount}</td>

                  <td className="px-6 py-4">Rs. {item.ticketPrice}</td>
                  <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
                  <td className="px-6 py-4">{item.timeSlot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <div className="flex items-center justify-center h-[50vh]">
          <h1 className="text-[22px] leading-9 text-headingColor font-[700] text-center">
            You have not made any bookings yet.
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
