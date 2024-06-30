import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL, token } from "../../utils/config";

const Gallery = ({ artistData }) => {
  const [formData, setFormData] = useState({
    gallaryPhotos: [],
  });

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [previewURLs, setPreviewURLs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setFormData({
      gallaryPhotos: artistData?.gallaryPhotos || [],
    });
    setPreviewURLs(artistData?.gallaryPhotos || []);
  }, [artistData]);

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    setPhotoLoading(true);

    try {
      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const data = await Promise.all(uploadPromises);
      const urls = data.map((d) => d.url);

      setPhotos((prevPhotos) => [...prevPhotos, ...urls]);
      setPreviewURLs((prevURLs) => [...prevURLs, ...urls]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        gallaryPhotos: [...prevFormData.gallaryPhotos, ...urls],
      }));
    } catch (error) {
      toast.error("Failed to upload images.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/artists/${artistData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mt-4">
        {previewURLs.map((url, index) => (
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

        <div className="relative w-[130px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=".jpg, .jpeg, .png"
            multiple
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />

          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer object-cover"
          >
            {photoLoading ? (
              <HashLoader size={20} color="#35727B" />
            ) : (
              "Upload Photos"
            )}
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="btn"
        disabled={loading}
        onClick={updateProfileHandler}
      >
        {loading ? <HashLoader color="#fff" size={25} /> : "Upload Gallery"}
      </button>
    </div>
  );
};

export default Gallery;
