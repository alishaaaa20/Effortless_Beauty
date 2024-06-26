import React, { useEffect, useState } from "react";
import axios from "axios";
import TableAction from "./tableAction";
import "./table.scss";

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

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/artists/all"
        );
        setArtists(response.data.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

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
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
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
