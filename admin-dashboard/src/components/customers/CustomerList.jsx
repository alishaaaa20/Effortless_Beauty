import React from "react";
import AreaTop from "../../components/customers/areaTop/areaTop";
import AreaTable from "./customerTable/table";

const CustomerList = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaTable />
    </div>
  );
};

export default CustomerList;
