import React, { useEffect, useState } from "react";
import axios from "axios";
import TableAction from "./tableAction";
import "./table.scss";
import { LuFilter } from "react-icons/lu";

const TABLE_HEADS = [
  "Artist Name",
  "Location",
  "Phone",
  "Email",
  "Status",
  "Amount",
  "Action",
];

const AreaTable = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/artists/all"
        );
        setArtists(response.data.data);
        setFilteredArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredArtists(artists);
    } else {
      setFilteredArtists(
        artists.filter((artist) => artist.isApproved === filter)
      );
    }
  }, [filter, artists]);

  const handleStatusChange = async (artistId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/artists/${artistId}`, {
        isApproved: newStatus,
      });

      setArtists((prevArtists) =>
        prevArtists.map((artist) =>
          artist._id === artistId
            ? { ...artist, isApproved: newStatus }
            : artist
        )
      );
    } catch (error) {
      console.error("Error updating artist status:", error);
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-diagram">
        <div className="mb-6 text-xl  flex items-center">
          <div className="flex mr-2 ">
            <label htmlFor="status-filter " className="text-lg">
              Filter Artists By:{" "}
            </label>
            <span className="mt-2 ml-2">
              {" "}
              <LuFilter strokeWidth={2} />
            </span>
          </div>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 p-2 border bg-primaryColor rounded-md w-60 text-white text-base"
          >
            <option value="all">All Makeup Artists</option>
            <option value="pending">Pending Makeup Artists</option>
            <option value="approved">Approved Makeup Artists</option>
            <option value="cancelled">Cancelled Makeup Artists</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map((artist) => (
              <tr key={artist._id}>
                <td>{artist.name}</td>
                <td>{artist.location}</td>
                <td>{artist.phone}</td>
                <td>{artist.email}</td>
                <td>
                  <div className="dt-status">
                    <span
                      className={`dt-status-dot dot-${artist.isApproved}`}
                    ></span>
                    <span className="dt-status-text">{artist.isApproved}</span>
                  </div>
                </td>
                <td>
                  <span className="dt-amount">Rs. {artist.ticketPrice}</span>
                </td>
                <td className="dt-cell-action">
                  <TableAction
                    artistId={artist._id}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(artist._id, newStatus)
                    }
                  />
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
