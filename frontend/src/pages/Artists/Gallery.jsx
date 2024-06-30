import React from "react";
import { BsHeartbreak } from "react-icons/bs";

const Gallery = ({ gallaryPhotos }) => {
  const openImage = (src) => {
    window.open(src, "_blank");
  };

  return (
    <div>
      {gallaryPhotos && gallaryPhotos.length > 0 ? (
        <div>
          <h3 className="text-[20px] mt-5 leading-[30px] text-headingColor font-semibold flex items-center gap-2">
            My Gallery
          </h3>
          <p className="text__para">Here are some of my works</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            {gallaryPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative w-full h-[150px] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openImage(photo)}
              >
                <img
                  src={photo}
                  alt={`Gallery Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[18px] mt-4 flex items-center">
          No gallery photos available for this artist right now.
          <BsHeartbreak className="text-red-600 ml-2" size={25} />
        </p>
      )}
    </div>
  );
};

export default Gallery;
