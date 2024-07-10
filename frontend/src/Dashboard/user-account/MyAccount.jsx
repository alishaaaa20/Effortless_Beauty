import React, { useContext, useState, useEffect } from "react";
import userImg from "../../assets/images/artist1.jpg";
import { AuthContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import ProfileSettings from "./ProfileSettings";
import api from "../../utils/api";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/users/${user._id}`)
      .then(({ data }) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUserData(data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching user data 🙁");
        setLoading(false);
      });
  }, [user._id]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section className="py-10">
      <div className="max-w-[1170px] mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-10 px-6 rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] border-2 border-solid border-primaryColor rounded-full">
                  <img
                    src={userData.photo ? userData.photo : userImg}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-headingColor">
                  {userData.name}
                </h2>
                <p className="text-md text-textColor">{userData.email}</p>
                <p className="text-md capitalize text-textColor">
                  {userData.gender}
                </p>
                <p className="text-md text-textColor">{userData.location}</p>
              </div>
              <div className="mt-10 md:mt-20">
                <button
                  onClick={handleLogout}
                  className="w-full p-3 text-md text-white bg-primaryColor rounded-md"
                >
                  Logout
                </button>
                <button className="w-full p-3 mt-3 text-md text-white bg-red-600 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-6">
              <div className="flex gap-5">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 text-md text-headingColor font-semibold leading-7 border border-solid border-primaryColor rounded-md`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 text-md text-headingColor font-semibold leading-7 border border-solid border-primaryColor rounded-md`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setTab("documents")}
                  className={`${
                    tab === "documents" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 text-md text-headingColor font-semibold leading-7 border border-solid border-primaryColor rounded-md`}
                >
                  My Documents
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <ProfileSettings user={userData} />}
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
                        {userData.documentName}
                      </p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="text-md text-headingColor font-semibold">
                        Document Number
                      </p>
                      <p className="text-md text-textColor font-normal">
                        {userData.documentNumber}
                      </p>
                    </div>
                    <div className="flex flex-col mt-4">
                      <p className="text-md text-headingColor font-semibold">
                        Document Photos
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userData.documentPhotos.map((photo) => (
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
        )}
      </div>
    </section>
  );
};

export default MyAccount;
