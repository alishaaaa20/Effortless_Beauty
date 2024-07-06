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

  const [errors, setErrors] = useState({});

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const handleQualificationFileChange = async (e, index) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData((prevFormData) => {
      const updatedQualifications = [...prevFormData.qualifications];
      updatedQualifications[index].photo = data?.url;
      return { ...prevFormData, qualifications: updatedQualifications };
    });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone) validationErrors.phone = "Phone number is required";
    if (!formData.location) validationErrors.location = "Location is required";
    if (!formData.bio) validationErrors.bio = "Bio is required";
    if (!formData.gender) validationErrors.gender = "Gender is required";
    if (!formData.specialization)
      validationErrors.specialization = "Specialization is required";
    if (!formData.ticketPrice === "")
      validationErrors.ticketPrice = "Service price should be a number";
    if (!formData.about) validationErrors.about = "About is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

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

  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
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
      present: false,
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
      present: false,
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
      date: "",
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

  const handlePresentChange = (key, index) => {
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index].present = !updatedItems[index].present;
      if (updatedItems[index].present) {
        updatedItems[index].endingDate = "";
      }
      return { ...prevFormData, [key]: updatedItems };
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-headingColor mb-8 leading-9">
        Profile Information
      </h2>

      <form onSubmit={updateProfileHandler}>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="form__input"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="form__input"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            className="form__input"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="mb-5">
          <p className="form__label">Location*</p>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="form__input"
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            placeholder="Write something about yourself"
            className="form__input"
            value={formData.bio}
            onChange={handleInputChange}
            maxLength={100}
          />
          {errors.bio && <p className="text-red-500">{errors.bio}</p>}
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                className="form__input"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <input
                type="text"
                name="specialization"
                placeholder="Your Specialization"
                className="form__input"
                value={formData.specialization}
                onChange={handleInputChange}
              />
              {errors.specialization && (
                <p className="text-red-500">{errors.specialization}</p>
              )}
            </div>
            <div>
              <p className="form__label">Service Price ($)*</p>
              <input
                type="number"
                name="ticketPrice"
                placeholder="Ticket Price"
                className="form__input"
                value={formData.ticketPrice}
                onChange={handleInputChange}
              />
              {errors.ticketPrice && (
                <p className="text-red-500">{errors.ticketPrice}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            placeholder="Write about yourself"
            className="form__input"
            value={formData.about}
            onChange={handleInputChange}
          />
          {errors.about && <p className="text-red-500">{errors.about}</p>}
        </div>

        <div className="mb-8">
          <p className="form__label">Qualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index} className="relative mb-5 p-4 rounded border">
              <div className="grid grid-cols-2 gap-5 ">
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form__input"
                    onChange={(e) => handleQualificationChange(e, index)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.present ? "" : item.endingDate}
                    className="form__input"
                    onChange={(e) => handleQualificationChange(e, index)}
                    disabled={item.present}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="present"
                    checked={item.present}
                    onChange={() =>
                      handlePresentChange("qualifications", index)
                    }
                  />
                  <label>Present</label>
                </div>
              </div>
              <div>
                <p className="form__label">Degree*</p>
                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  className="form__input"
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>
              <div>
                <p className="form__label">Institution*</p>
                <input
                  type="text"
                  name="institution"
                  value={item.institution}
                  className="form__input"
                  onChange={(e) => handleQualificationChange(e, index)}
                />
              </div>
              <div className="mt-3">
                <p className="form__label">Photo</p>
                <input
                  type="file"
                  className="form__input"
                  onChange={(e) => handleQualificationFileChange(e, index)}
                />
              </div>
              <button
                className="absolute -top-8 -right-3 bg-red-600 p-1 rounded text-white text-lg"
                onClick={(e) => deleteQualification(e, index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className="bg-primaryColor py-2 px-4 rounded text-white"
            onClick={addQualification}
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-8">
          <p className="form__label">Experience</p>
          {formData.experiences?.map((item, index) => (
            <div key={index} className="relative mb-5 p-4 rounded border">
              <div className="grid grid-cols-2 gap-5 ">
                <div>
                  <p className="form__label">Starting Date*</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    className="form__input"
                    onChange={(e) => handleExperienceChange(e, index)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <p className="form__label">Ending Date*</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.present ? "" : item.endingDate}
                    className="form__input"
                    onChange={(e) => handleExperienceChange(e, index)}
                    disabled={item.present}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="present"
                    checked={item.present}
                    onChange={() => handlePresentChange("experiences", index)}
                  />
                  <label>Present</label>
                </div>
              </div>
              <div>
                <p className="form__label">Position*</p>
                <input
                  type="text"
                  name="position"
                  value={item.position}
                  className="form__input"
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <div>
                <p className="form__label">Company*</p>
                <input
                  type="text"
                  name="company"
                  value={item.company}
                  className="form__input"
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
              <button
                className="absolute -top-8 -right-3 bg-red-600 p-1 rounded text-white text-lg"
                onClick={(e) => deleteExperience(e, index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className="bg-primaryColor py-2 px-4 rounded text-white"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>

        <div className="mb-8">
          <p className="form__label">Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index} className="relative mb-5 p-4 rounded border">
              <div>
                <p className="form__label">Date*</p>
                <input
                  type="date"
                  name="date"
                  value={item.date}
                  className="form__input"
                  onChange={(e) => handleTimeSlotChange(e, index)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <p className="form__label">Starting Time*</p>
                <input
                  type="time"
                  name="startingTime"
                  value={item.startingTime}
                  className="form__input"
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </div>
              <div>
                <p className="form__label">Ending Time*</p>
                <input
                  type="time"
                  name="endingTime"
                  value={item.endingTime}
                  className="form__input"
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </div>
              <button
                className="absolute -top-8 -right-3 bg-red-600 p-1 rounded text-white text-lg"
                onClick={(e) => deleteTimeSlot(e, index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            className="bg-primaryColor py-2 px-4 rounded text-white"
            onClick={addTimeSlot}
          >
            Add Time Slot
          </button>
        </div>
        <div className="mt-5">
          <p className="form__label">Upload Profile Photo*</p>
          <input
            type="file"
            name="photo"
            className="form__input"
            onChange={handleFileInputChange}
          />
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Profile"
              className="mt-2 h-24 w-24 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-primaryColor py-2 px-4 rounded text-white mt-4"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
