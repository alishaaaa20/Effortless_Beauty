import React from "react";
import AreaTop from "../artists/areaTop/areaTop";
import ArtistTable from "../artists/artistTable/table";

const ArtistList = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <ArtistTable />
    </div>
  );
};

export default ArtistList;
