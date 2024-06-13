import React, { useState } from "react";
import artistImg from "../../assets/images/artist1.jpg";
import ArtistAbout from "./ArtistAbout";
import Feedback from "./Feedback";
import starIcon from "../../assets/images/Star.png";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

const ArtistDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: artist,
    loading,
    error,
  } = useFetch(`${BASE_URL}/artists/${id}`);

  console.log(artist, "artist");

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    photo,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    location,
  } = artist;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error error={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="Artist" className="w-full" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {location}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>

                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" /> {averageRating || 0}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating || 0})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-6 lg:max-w-[390px] md:text-[15px]">
                    {specialization}
                  </p>
                  <p className="text__para text-[14px] leading-6 lg:max-w-[390px] md:text-[15px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[70px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-5 px-2 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-5 px-2 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div>
                {tab === "about" && (
                  <ArtistAbout
                    name={name}
                    qualifications={qualifications}
                    experiences={experiences}
                    timeSlots={timeSlots}
                    bio={bio}
                    photo={photo}
                    about={about}
                    averageRating={averageRating}
                    specialization={specialization}
                    ticketPrice={ticketPrice}
                    location={location}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>
            <div>
              <SidePanel />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistDetails;
