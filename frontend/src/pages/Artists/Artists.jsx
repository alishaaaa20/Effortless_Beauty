import React, { useState, useEffect } from "react";
import ArtistCard from "../../components/Artists/ArtistCard";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import ArtistList from "../../components/Artists/ArtistList";

const Artists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredArtists, setFilteredArtists] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      let endpoint = `${BASE_URL}/artists/search/getAllArtist`;

      if (searchInput) {
        endpoint += `?query=${searchInput}`;
      }

      const response = await fetch(endpoint);

      if (response.ok) {
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setFilteredArtists(data.data);
        } else {
          setFilteredArtists([]);
        }
      } else {
        console.error(
          "Error fetching artist data - HTTP Error:",
          response.status
        );
        setFilteredArtists([]);
      }
    } catch (error) {
      // Handle other errors (e.g., network error) here
      console.error("Error fetching artist data:", error);
      setFilteredArtists([]);
    }
  };

  useEffect(() => {
    // Fetch all approved artists on initial load
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${BASE_URL}/artists`);

        if (response.ok) {
          const data = await response.json();

          if (data.success && Array.isArray(data.data)) {
            setFilteredArtists(data.data);
          } else {
            setFilteredArtists([]);
          }
        } else {
          console.error(
            "Error fetching artist data - HTTP Error:",
            response.status
          );
          setFilteredArtists([]);
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setFilteredArtists([]);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <section className="">
        <div className="container text-center">
          <h2 className="heading text-center text-[40px] text-primaryColor">
            Find a Makeup Artist
          </h2>
          <form onSubmit={handleSearch}>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
              <input
                type="search"
                placeholder="Search Makeup Artists"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              />
              <button
                type="submit"
                className="btn mt-0 rounded-[0px] rounded-r-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        </div>
      </section> */}

      {/*-----Artist section starts-----*/}

      <section>
        <div className="container">
          <ArtistList query={searchInput} />
        </div>
      </section>

      {/*-----artist section ends-----*/}
    </>
  );
};

export default Artists;
