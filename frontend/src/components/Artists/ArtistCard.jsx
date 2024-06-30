import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const ArtistCard = ({ artist }) => {
  //const {data: artist} = useFetch(`${BASE_URL}/artists/${id}`)
  const {
    _id,
    name,
    photo,
    location,
    specialization,
    averageRating,
    totalRating,
    totalCustomers,
    experiences,
  } = artist;

  // Format the average rating to one decimal place
  const formattedAverageRating = averageRating
    ? averageRating.toFixed(1)
    : "N/A";

  return (
    <div className="p-4   w-[350px]  border-primaryColor ">
      <div>
        <img
          src={photo}
          className="w-[200px] h-[200px] object-cover rounded"
          alt={name}
        />
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {location}
        </span>

        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img src={starIcon} alt="Star" /> {formattedAverageRating || 0}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-textColor">
            ({totalRating || 0})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          {/* <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
            +{totalCustomers || 0} Customers
          </h3> */}
          <p className="text-[14px] mb-5  leading-6 lg:text-[16px] lg:leading-7 font-[500] text-textColor">
            {specialization}
          </p>

          <p className="text-[16px] leading-6 font-[500] text-textColor">
            At {experiences && experiences[0]?.company}
          </p>
        </div>

        <Link
          to={`/artists/${_id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid bg-primaryColor text-white   flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ArtistCard;
