import React, { useContext, useState, useEffect } from "react";
import userImg from "../../assets/images/artist1.jpg";
import { AuthContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import ProfileSettings from "./ProfileSettings";
import useGetProfile from "../../hooks/useFetchData"; // Unused import, consider removing if not needed
import { BASE_URL } from "../../utils/config"; // Unused import, consider removing if not needed
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
          console.log(data.error);
          setError(data.error);
        } else {
          setUserData(data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching user data 🙁");
        setLoading(false);
      });
  }, [user._id]);

  console.log("userData", userData);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section className="py-10">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
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
                <h2 className="text-md leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h2>
                <p className="text-md text-textColor leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-md capitalize text-textColor leading-6 font-medium">
                  {userData.gender}
                </p>
                <p className="text-md text-textColor leading-6 font-medium">
                  {userData.location}
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
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

            <div className="md:col-span-2  md:px-[30px] ">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={` ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  }
               p-2 mr-5 px-5  text-md text-headingColor font-semibold leading-7 border border-solid  border-primaryColor rounded-md`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  }
               py-2 px-5  text-md text-headingColor font-semibold leading-7 border border-solid  border-primaryColor rounded-md`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" ? (
                <MyBookings />
              ) : (
                <ProfileSettings user={userData} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
