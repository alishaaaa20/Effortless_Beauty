import React from "react";
import { formateDate } from "../../../utils/formateDate";

const ArtistAbout = ({ name, about, qualifications, experiences }) => {
  const openImage = (src) => {
    window.open(src, "_blank");
  };

  return (
    <div>
      <div>
        <h3 className="text-[20px] mt-5 leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About
          <span className="text-[20px] font-bold text-irisBlurColor leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para">{about}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Qualification
        </h3>
        {qualifications?.map((item, index) => (
          <ul key={index} className="grid sm:grid-cols-2 gap-10 pt-4 md:p-5">
            <li className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-base leading-6 font-semibold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-base leading-6 font-medium text-textColor mt-4">
                {item.degree}
              </p>
              <p className="text-base leading-6 font-medium text-textColo mt-4">
                {item.institution}
              </p>
            </li>
            {item.photo && (
              <img
                src={item.photo}
                alt={`Qualification Certificate ${index + 1}`}
                className="mt-2 w-44 object-cover cursor-pointer"
                onClick={() => openImage(item.photo)}
              />
            )}
          </ul>
        ))}
      </div>

      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-10 pt-4 md:p-5">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-base leading-6 font-semibold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-base leading-6 font-medium text-textColor mt-4">
                {item.position}
              </p>
              <p className="text-base leading-6 font-medium text-textColor mt-4">
                {item.company}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistAbout;
