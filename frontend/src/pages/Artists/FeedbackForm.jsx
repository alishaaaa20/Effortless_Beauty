import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../utils/config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Please provide rating and review text");
        return; // Exit the function if rating or reviewText is missing
      }

      const response = await fetch(`${BASE_URL}/artists/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          reviewText,
        }),
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
      <button type="submit" className="btn" disabled={loading}>
        {loading ? <HashLoader color="#fff" size={25} /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;
