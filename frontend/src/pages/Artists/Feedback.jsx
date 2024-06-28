import React, { useState, useEffect } from "react";
import avatar from "../../assets/images/icon.jpeg";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const openImage = (src) => {
    window.open(src, "_blank");
  };

  useEffect(() => {
    console.log("Reviews:", reviews);
  }, [reviews]);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] mt-5 leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-[18px] leading-6 text-textColor font-medium text-center">
              No reviews yet
            </p>
          </div>
        ) : (
          reviews?.map((review, index) => (
            <div key={index} className="flex flex-col gap-4 mb-[30px]">
              <div className="flex justify-between gap-10">
                <div className="flex gap-3">
                  <figure className="w-10 h-10 rounded-full">
                    <img
                      className="w-full"
                      src={review?.user?.photo || avatar}
                      alt="User"
                    />
                  </figure>
                  <div>
                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                      {review?.user?.name}
                    </h5>
                    <p className="text-[14px] leading-6 text-textColor">
                      {formateDate(review?.createdAt)}
                    </p>
                    <p className="text__para mt-3 font-medium text-[15px]">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(review?.rating).keys()].map((_, index) => (
                    <AiFillStar key={index} color="#F6BE00" />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {review?.photos?.map((photo, index) => (
                  <figure
                    key={index}
                    className="w-[200px]  rounded border-2 border-solid border-primaryColor flex items-center justify-center"
                  >
                    <img
                      src={photo}
                      alt={`Review ${index + 1}`}
                      className="w-[200px] h-[150px] rounded object-cover"
                      onClick={() => openImage(photo)}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {!showFeedbackForm ? (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      ) : (
        <FeedbackForm />
      )}
    </div>
  );
};

export default Feedback;
