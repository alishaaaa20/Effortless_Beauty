import React from "react";
import useFetchData from "../../hooks/useFetchData";
import ArtistCard from "../../components/Artists/ArtistCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../utils/config";

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
          {appointments.map((artist) => (
            <ArtistCard artist={artist} key={artist.id} />
          ))}
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
