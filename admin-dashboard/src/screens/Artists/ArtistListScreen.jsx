import React from "react";
import AreaTop from "../../components/artists/areaTop/areaTop";
import artistTable from "../../components/artists/artistTable/table";

const ArtistList = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <artistTable />
    </div>
  );
};

export default ArtistList;
