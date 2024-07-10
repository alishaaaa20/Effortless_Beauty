import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../utils/config";
import Tabs from "./Tabs";
import artistImg from "../../assets/images/artist1.jpg";
import starIcon from "../../assets/images/Star.png";
import ArtistAbout from "../../pages/Artists/ArtistAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";
import Gallary from "./Gallary";
import Gallery from "../../pages/Artists/Gallery";

const ArtistProfile = () => {
  const [tab, setTab] = useState("overview");
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/artists/profile/me`
  );

  const renderApprovalStatus = () => {
    if (data.isApproved === "pending") {
      return (
        <div className="flex bg-yellow-50 mb-4 text-yellow-800 rounded-lg p-4">
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
          <div>
            To get approved, please complete your profile. We'll review your
            profile and get back to you within 24 hours.
          </div>
        </div>
      );
    } else if (data.isApproved === "approved") {
      return (
        <div className="flex bg-green-50 mb-4 text-green-800 rounded-lg p-4">
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
            className="lucide lucide-check-circle w-6 h-6 flex-shrink-0"
          >
            <path d="M9 12l2 2 4-4" />
            <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" />
          </svg>
          <div className="ml-2">
            Congratulations, your profile has been approved.
          </div>
        </div>
      );
    } else if (data.isApproved === "cancelled") {
      return (
        <div className="flex bg-red-50 mb-4 text-red-800 rounded-lg p-4">
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
            className="lucide lucide-x-circle w-6 h-6 flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <div className="ml-2">
            Sorry, your profile has been cancelled. Please contact support for
            more information. Or try to create a new profile.
          </div>
        </div>
      );
    }
  };

  return (
    <section>
      <div className="max-w-[1170px]  mx-2">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {renderApprovalStatus()}
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
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-md leading-4 lg:text-lg lg:leading-6 font-semibold">
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
                        <p className="text-[18px] mt-5 leading-6 font-medium text-textColor mt-2">
                          {data.specialization}
                        </p>
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
                    <Gallery gallaryPhotos={data.gallaryPhotos} />
                  </div>
                )}
                {tab === "appointments" && <Appointments artistId={data._id} />}
                {tab === "settings" && (
                  <div>
                    <Profile artistData={data} />
                  </div>
                )}
                {tab === "gallary" && (
                  <div>
                    <Gallary artistData={data} />
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
                          {data.documentName}
                        </p>
                      </div>
                      <div className="flex flex-col mt-4">
                        <p className="text-md text-headingColor font-semibold">
                          Document Number
                        </p>
                        <p className="text-md text-textColor font-normal">
                          {data.documentNumber}
                        </p>
                      </div>
                      <div className="flex flex-col mt-4">
                        <p className="text-md text-headingColor font-semibold">
                          Document Photos
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {data.documentPhotos.map((photo) => (
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
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistProfile;
