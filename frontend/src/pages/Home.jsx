import React from 'react';

const Home = () => {
  return (
    <>
      {/*-----hero section-----*/}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

            {/*-----hero content-----*/}
            <div>
              <div className="lg:w-[570px]">
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[40px] md:leading-[70px] text-white'>Discover a Makeup artist, near you</h1>
                <p className="text__para text-white md:text-[18px]">
                  Save time and leave the stress behind. Book the best makeup artist for your wedding, party, or any other occasion.
                </p>
                <button className="btn">Request a Booking </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
