import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../utils/config";
import { toast } from "react-toastify";

export default function Profile({ artistData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: artistData?.name,
      email: artistData?.email,
      phone: artistData?.phone,
      location: artistData?.location,
      bio: artistData?.bio,
      gender: artistData?.gender,
      specialization: artistData?.specialization,
      ticketPrice: artistData?.ticketPrice,
      qualifications: artistData?.qualifications,
      experiences: artistData?.experiences,
      timeSlots: artistData?.timeSlots,
      about: artistData?.about,
      photo: artistData?.photo,
    });
  }, [artistData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/artists/${artistData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      setTimeout(() => {
        window.location.href = "/artists/profile/me";
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], index],
    }));
  };

  const handleReusableInputChangeFunc = (key, index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return { ...prevFormData, [key]: updatedItems };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      institution: "",
      photo: "",
    });
  };

  const handleQualificationChange = (e, index) => {
    handleReusableInputChangeFunc("qualifications", index, e);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      company: "",
    });
  };

  const handleExperienceChange = (e, index) => {
    handleReusableInputChangeFunc("experiences", index, e);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const handleTimeSlotChange = (e, index) => {
    handleReusableInputChangeFunc("timeSlots", index, e);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-headingColor mb-8 leading-9">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name" // Ensure this matches the state key
            placeholder="Enter your full name"
            className="form__input"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email" // Ensure this matches the state key
            placeholder="Enter your email"
            className="form__input"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone" // Ensure this matches the state key
            placeholder="Enter your phone number"
            className="form__input"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Location*</p>
          <input
            type="location"
            name="location"
            placeholder="Enter your location"
            className="form__input"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio" // Ensure this matches the state key
            placeholder="Write something about yourself"
            className="form__input"
            value={formData.bio}
            onChange={handleInputChange}
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5 px-4 w-full border bg-white border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <input
                type="text"
                name="specialization" // Ensure this matches the state key
                placeholder="Specialization"
                className="form__input"
                value={formData.specialization}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="form__label">Service Price*</p>
              <input
                type="number"
                name="ticketPrice" // Ensure this matches the state key
                placeholder="Enter your service price"
                className="form__input"
                value={formData.ticketPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ticketPrice: parseFloat(e.target.value) || 0,
                  })
                } // Manually convert to number
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      placeholder="Starting Date"
                      className="form__input"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      placeholder="Ending Date"
                      className="form__input"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      className="form__input"
                      value={item.degree}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Institution*</p>
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution"
                      className="form__input"
                      value={item.institution}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={item.photo}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </figure>

                  <div className="relative w-[130px] h-[50px]">
                    <input
                      type="file"
                      name="photo"
                      id="customFile"
                      className="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer"
                      onChange={(e) => handleQualificationChange(e, index)}
                      accept=".jpg, .jpeg, .png"
                    />
                    <label
                      htmlFor="customFile"
                      className="absolute top-0 left-0 w-ful h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                    >
                      Upload Certificate Photo
                    </label>
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addQualification}
            className="bg-black py-2 px-5 rounded  h-fit text-white cursor-pointer"
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      placeholder="Starting Date"
                      className="form__input"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      placeholder="Ending Date"
                      className="form__input"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      placeholder="Position"
                      className="form__input"
                      value={item.position}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Company*</p>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      className="form__input"
                      value={item.company}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-black py-2 px-5 rounded  h-fit text-white cursor-pointer"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5 ">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                      className="form__input py-3.5 px-4 w-full border bg-white border-primaryColor rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      placeholder="Ending Date"
                      className="form__input"
                      value={item.startingTime}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      placeholder="Ending Date"
                      className="form__input"
                      value={item.endingTime}
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px]   cursor-pointer mt-8"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="bg-black py-2 px-5 rounded  h-fit text-white cursor-pointer"
          >
            Add Timeslot
          </button>
        </div>
        <div className="mt-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            placeholder="Write something about yourself"
            className="form__input"
            value={formData.about}
            onChange={handleInputChange}
            rows={5}
          />
        </div>
        <div className="mt-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              className="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer"
              onChange={handleFileInputChange}
              accept=".jpg, .jpeg, .png"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-ful h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-9">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
