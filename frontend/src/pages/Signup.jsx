import React, { useState, useContext } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [documentFiles, setDocumentFiles] = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "male",
    role: "customer",
    phone: "",
    location: "",
    documentName: "",
    documentNumber: "",
    documentPhotos: [],
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setPhotoLoading(true);

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleDocumentFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    setPhotoLoading(true);

    try {
      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const data = await Promise.all(uploadPromises);
      const urls = data.map((d) => d.url);

      setDocumentFiles((prevFiles) => [...prevFiles, ...urls]);
      setDocumentPreviews((prevPreviews) => [...prevPreviews, ...urls]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        documentPhotos: [...prevFormData.documentPhotos, ...urls],
      }));
    } catch (error) {
      toast.error("Failed to upload document images.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate(`/verify?email=${formData.email}`);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Eg: John Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Eg: john@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                  required
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="mb-5">
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="Eg: 9841234567"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Kathmandu"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="mb-5">
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Document Name
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: Passport, Citenzenship"
                    name="documentName"
                    value={formData.documentName}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Document Number
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: 123456789"
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleInputChange}
                    className="w-full pr-4 py-3 border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                {documentPreviews.map((url, index) => (
                  <figure
                    key={index}
                    className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full rounded-full"
                    />
                  </figure>
                ))}

                <div className="relative w-[200px] h-[50px]">
                  <input
                    type="file"
                    name="documentPhotos"
                    id="customDocumentFile"
                    onChange={handleDocumentFileInputChange}
                    accept=".jpg, .jpeg, .png"
                    multiple
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="customDocumentFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer object-cover"
                  >
                    {photoLoading ? (
                      <HashLoader size={20} color="#35727B" />
                    ) : (
                      "Upload Document Photos"
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={handleInputChange}
                    checked={formData.gender === "male"}
                    className="hidden"
                  />
                  <label
                    htmlFor="male"
                    className="flex items-center gap-[0.5rem] font-medium text-[16px] leading-6 cursor-pointer text-headingColor"
                  >
                    <span
                      className={`w-[1.25rem] h-[1.25rem] rounded-full border-[1px] border-solid border-[#0171b6] flex items-center justify-center ${
                        formData.gender === "male"
                          ? "bg-primaryColor"
                          : "bg-transparent"
                      }`}
                    >
                      {formData.gender === "male" && (
                        <span className="w-[8px] h-[8px] rounded-full bg-white"></span>
                      )}
                    </span>
                    Male
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={handleInputChange}
                    checked={formData.gender === "female"}
                    className="hidden"
                  />
                  <label
                    htmlFor="female"
                    className="flex items-center gap-[0.5rem] font-medium text-[16px] leading-6 cursor-pointer text-headingColor"
                  >
                    <span
                      className={`w-[1.25rem] h-[1.25rem] rounded-full border-[1px] border-solid border-[#0171b6] flex items-center justify-center ${
                        formData.gender === "female"
                          ? "bg-primaryColor"
                          : "bg-transparent"
                      }`}
                    >
                      {formData.gender === "female" && (
                        <span className="w-[8px] h-[8px] rounded-full bg-white"></span>
                      )}
                    </span>
                    Female
                  </label>
                </div>

                <div className="w-full lg:w-[47%]">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full py-[0.625rem] px-[1rem] border-b border-solid border-[#35727B] focus:outline-none focus:border-b-primaryColor text-lg lg:text-[16px] leading-7 text-headingColor placeholder:text-gray-400 cursor-pointer bg-transparent"
                  >
                    <option value="customer">Customer</option>
                    <option value="artist">Makeup Artist</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex flex-col">
                  <label className="mb-2 text-headingColor font-bold text-[16px] leading-7">
                    Upload Profile Photo:
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .jpeg, .png"
                    className="p-2 border border-solid border-[#35727B] rounded-md"
                  />
                </div>
                {previewURL && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor mt-4">
                    <img
                      src={previewURL}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </figure>
                )}
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor hover:bg-headingColor transition duration-150 ease-in text-white text-lg lg:text-[16px] leading-7 font-semibold py-3 rounded-lg"
                  disabled={loading}
                >
                  {loading ? <HashLoader size={30} color="#fff" /> : "Signup"}
                </button>
              </div>
            </form>

            <div className="text-[15px] font-semibold text-headingColor text-center">
              Already have an account?
              <Link to="/login" className="text-primaryColor pl-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
