import React from 'react';
import ArtistCard from './ArtistCard'; // Use consistent import paths
import { artists } from '../../assets/data/artists'; // Use a consistent import path

const ArtistList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;
