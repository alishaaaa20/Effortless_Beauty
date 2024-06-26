import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/artists/${id}`
        );
        setArtist(response.data.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [id]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p className="text-gray-500 text-sm font-bold">
        Location: {artist.location}
      </p>
      <p>Phone: {artist.phone}</p>
      <p>Email: {artist.email}</p>
      <p>Status: {artist.isApproved}</p>
      <p>Amount: Rs. {artist.ticketPrice}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ArtistProfile;
