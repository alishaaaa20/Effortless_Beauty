import React from 'react';
import ArtistCard from './ArtistCard';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const ArtistList = () => {
  const { data: artistData } = useFetch(`${BASE_URL}/artists/search/getArtists`);

  console.log(artistData);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {artistData.map((artist) => (
        <ArtistCard key={artist._id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;

