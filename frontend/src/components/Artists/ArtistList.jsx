import React from 'react';
import ArtistCard from './ArtistCard';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const ArtistList = () => {
  const { data: artists, loading, error } = useFetch(`${BASE_URL}/artists`);

  console.log(artists);

  return (
    <div>
      {loading && <h4>Loading.....</h4>}
      {error && <h4>{error}</h4>}
      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          {artists?.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistList;


