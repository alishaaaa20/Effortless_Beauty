import React, { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          className={`${
            tab === "overview"
              ? "bg-indigo-50 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${
            tab === "appointments"
              ? "bg-indigo-50 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("appointments")}
        >
          Appointments
        </button>
        <button
          className={`${
            tab === "settings"
              ? "bg-indigo-50 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
          onClick={() => setTab("settings")}
        >
          Profile Settings
        </button>
        <div className="mt-[50px] md:mt-[100px] w-full">
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
    </div>
  );
};

export default Tabs;
