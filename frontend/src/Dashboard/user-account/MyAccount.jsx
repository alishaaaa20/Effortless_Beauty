import React, { useContext } from "react";
import userImg from "../../assets/images/artist1.jpg";
import { AuthContext } from "../../context/AuthContext";

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] bprder-2 border-solid border-primaryColor rounded-full">
              <img
                src={userImg}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </figure>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-md leading-[30px] text-headingColor font-bold">
              John Doe
            </h2>
            <p className="text-md text-textColor leading-6 font-medium">
              example@gmail.com
            </p>
            <p className="text-md text-textColor leading-6 font-medium">
              1234567890
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
      </div>
    </div>
  );
};

export default MyAccount;
