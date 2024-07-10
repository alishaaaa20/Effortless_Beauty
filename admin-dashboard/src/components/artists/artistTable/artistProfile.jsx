import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import starIcon from "../../../assets/icons/moon.svg";
import ArtistAbout from "./ArtistAbout";
import Feedback from "./Feedback";
import Gallary from "./Gallery";

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [tab, setTab] = useState("about");

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/artists/${id}`
        );
        setArtist(response.data.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [id]);

  if (!artist) return <div>Loading...</div>;

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
        <div className="grid grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={artist.photo} alt="Artist" className="w-full" />
              </figure>

              <div>
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded mt-8">
                  {artist.location}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold mt-4">
                  {artist.name}
                </h3>

                <div className="flex items-center gap-[6px] mt-4">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> {artist.averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                    ({artist.totalRating})
                  </span>
                </div>
                <p className="text__para text-[14px] leading-6 lg:max-w-[390px] md:text-[15px] mt-4">
                  {artist.specialization}
                </p>
                <p className="text__para text-[14px] leading-6 lg:max-w-[390px] md:text-[15px] mt-4">
                  {artist.bio}
                </p>
              </div>
            </div>

            <div className="mt-[70px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about" && "border-b border-solid border-primaryColor"
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
              <button
                onClick={() => setTab("gallary")}
                className={`${
                  tab === "gallary" &&
                  "border-b border-solid border-primaryColor"
                } py-5 px-2 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Gallary
              </button>
              <button
                onClick={() => setTab("documents")}
                className={`${
                  tab === "documents" &&
                  "border-b border-solid border-primaryColor"
                } py-5 px-2 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Documents
              </button>
            </div>

            <div>
              {tab === "about" && (
                <ArtistAbout
                  name={name}
                  qualifications={qualifications}
                  experiences={experiences}
                  bio={bio}
                  photo={photo}
                  about={about}
                  averageRating={averageRating}
                  specialization={specialization}
                  location={location}
                />
              )}
              {tab === "feedback" && (
                <Feedback reviews={reviews} totalRating={totalRating} />
              )}
              {tab === "gallary" && (
                <div>
                  <Gallary artistData={artist} />
                </div>
              )}
              {tab === "documents" && (
                <div>
                  <h2 className="text-lg text-headingColor font-semibold mt-8">
                    My Documents
                  </h2>
                  <div className="mt-5 space-y-4">
                    <div className="flex flex-col">
                      <p className="text-md text-headingColor font-semibold">
                        Document Name
                      </p>
                      <p className="text-md text-textColor font-normal">
                        {artist.documentName}
                      </p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="text-md text-headingColor font-semibold">
                        Document Number
                      </p>
                      <p className="text-md text-textColor font-normal">
                        {artist.documentNumber}
                      </p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="text-md text-headingColor font-semibold">
                        Document Photos
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {artist.documentPhotos.map((photo) => (
                          <figure
                            key={photo}
                            className=" border-2 border-solid border-primaryColor rounded-md"
                          >
                            <img
                              src={photo}
                              alt="Document"
                              className="w-[200px] h-[150px] object-cover rounded-md"
                            />
                          </figure>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div>
              <SidePanel
                artistId={artist._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
              />
            </div> */}
        </div>
      </div>
    </section>
  );
};

export default ArtistProfile;
