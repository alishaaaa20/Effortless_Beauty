import React, { useState } from 'react'; // Import useState if you plan to use it
import { artists } from '../../assets/data/artists';
import ArtistCard from '../../components/Artists/ArtistCard';

const Artists = () => {
  const [searchInput, setSearchInput] = useState(''); 
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading text-center text-[40px] text-primaryColor">Find a Makeup Artist</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              placeholder="Search Makeup Artists"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // Add an onChange handler to update `searchInput`
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Artists;

 