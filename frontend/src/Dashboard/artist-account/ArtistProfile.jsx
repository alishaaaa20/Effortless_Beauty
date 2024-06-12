import React, { useState, useEffect, useContext } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../utils/config";
import Tabs from "./Tabs";
import api from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import artistImg from "../../assets/images/artist1.jpg";
import starIcon from "../../assets/images/Star.png";
import ArtistAbout from "../../pages/Artists/ArtistAbout";
import Profile from "./Profile";

const ArtistProfile = () => {
  const [userData, setUserData] = useState({});

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/artists/profile/me`
  );

  console.log("data", data);

  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex bg-yellow-50  mb-4 text-yellow-800 rounded-lg p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-triangle-alert w-6 h-6 flex-shrink-0"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>

                  <span className="sr-only">Info</span>
                  <div>
                    To get approved, please complete your profile. We'll review
                    your profile and get back to you within 24 hours.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-16">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data?.photo ? data.photo : artistImg}
                          alt="profile"
                          className="w-full rounded"
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-md leading-4 lg:text-lg lg:leading-6 font-semibols">
                          {data.location}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="star" />
                            {data.averageRating ? data.averageRating : 0}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalReviews ? data.totalReviews : 0})
                          </span>
                        </div>
                        <p className="text__para font-[15px] lg:max-w-[400px] leading-6">
                          {data?.bio ? data.bio : "No bio available"}
                        </p>
                      </div>
                    </div>
                    <ArtistAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <div>Appointments</div>}
                {tab === "settings" && (
                  <div>
                    <Profile artistData={data} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistProfile;
