import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../utils/config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [previewURLs, setPreviewURLs] = useState([]);

  const { id } = useParams();

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    setPhotoLoading(true);

    try {
      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const data = await Promise.all(uploadPromises);
      const urls = data.map((d) => d.url);

      setPhotos([...photos, ...urls]);
      setPreviewURLs([...previewURLs, ...urls]);
    } catch (error) {
      toast.error("Failed to upload images.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Please provide rating and review text");
        return;
      }

      const formData = {
        rating,
        reviewText,
        photos,
        artist: id, // Ensure the artist ID is included in the payload
      };

      const response = await fetch(`${BASE_URL}/artists/${id}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <div>
        <h3 className="text-headingColor text-base font-semibold mb-4 mt-0">
          How would you rate the overall service?*
        </h3>
        <div>
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (rating || hover)
                    ? "text-yellowColor"
                    : "text-textColor"
                } bg-transparent border-none outline-none text-xl cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-headingColor text-base font-semibold mb-4 mt-0">
          Share your feedback*
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline-none outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your feedback here..."
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
        ></textarea>
      </div>

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

      <button type="submit" className="btn" disabled={loading}>
        {loading ? <HashLoader color="#fff" size={25} /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
