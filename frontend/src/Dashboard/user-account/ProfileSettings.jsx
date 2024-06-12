import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../utils/config";

const ProfileSettings = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    gender: "",
    location: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      location: user.location,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setLoading(true);

    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);

      setTimeout(() => {
        window.location.href = "/users/profile/me";
      }, 5000);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-gray-400 focus:outline-none focus:border-blue-500 text-lg leading-7 text-gray-700 placeholder-gray-500"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-b border-solid border-gray-400 focus:outline-none focus:border-blue-500 text-lg leading-7 text-gray-700 placeholder-gray-500"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Enter your location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-gray-400 focus:outline-none focus:border-blue-500 text-lg leading-7 text-gray-700 placeholder-gray-500"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-bold mb-2">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .jpeg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primaryColor text-white font-semibold rounded-lg cursor-pointer px-4 py-3 leading-6 overflow-hidden truncate"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-9">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryColor text-white text-lg rounded-lg px-4 py-3 leading-7"
          >
            {loading ? (
              <HashLoader size={25} color="#ffffff" />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
