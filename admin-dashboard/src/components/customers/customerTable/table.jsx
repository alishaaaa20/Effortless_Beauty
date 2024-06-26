import React, { useEffect, useState } from "react";
import axios from "axios";
import TableAction from "./tableAction";
import "./table.scss";

const TABLE_HEADS = [
  "Customer Name",
  "Location",
  "Phone",
  "Email",
  "Gender",
  "Action",
];

const AreaTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                {/* <td>
                  <div className="dt-status">
                    <span
                      className={`dt-status-dot dot-${user.isApproved}`}
                    ></span>
                    <span className="dt-status-text">{user.isApproved}</span>
                  </div>
                </td> */}
                {/* <td>
                  <span className="dt-amount">Rs. {user.ticketPrice}</span>
                </td> */}
                <td className="dt-cell-action">
                  <TableAction />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
