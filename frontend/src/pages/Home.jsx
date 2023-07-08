import React from 'react';
import icons02 from '../assets/images/icon02.png';
import icons03 from '../assets/images/icon03.png';
import icons04 from '../assets/images/khalti-logo.jpg';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

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
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[39px] md:leading-[70px] text-white'>Discover a Makeup artist, near you</h1>
                <p className="text__para text-white md:text-[16px]">
                  Save time and leave the stress behind. Book the best makeup artist for your wedding, party, or any other occasion.
                </p>
                <button className="btn">Request a Booking </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*-----hero__section end ------*/}

      <section>
        <div className='container'>
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center text-[40px]'>
              We provide the best makeup artists.
            </h2>
            <p className="text__para text-center">
              We have the suitable makeup artist for your occasion. We have a wide range of makeup artists who are experts in their field.
            </p>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
             <div className="py-[30px] px-5">
              <div className='flex items-center justify-center'>
                <img src={icons02} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[22px] leading-9 text-headingColor font-[700] text-center'>
                   Search a Makeup Artist
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                    We have a perfect makeup artists near you.
                </p>

                <Link to="/artists" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>

              </div>
             </div>

             <div className="py-[30px] px-5">
              <div className='flex items-center justify-center'>
                <img src={icons03} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[22px] leading-9 text-headingColor font-[700] text-center'>
                   Book a Schedule
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                    We have a perfect makeup artists near you.
                </p>

                <Link to="/artists" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>

              </div>
             </div>

             <div className="py-[30px] px-5">
              <div className='flex items-center justify-center'>
                <img src={icons04} alt="" />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[22px] leading-9 text-headingColor font-[700] text-center'>
                   Make a Pre-Payment
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                    We provide a secure payment system where you can make a pre-payment through Khalti.
                </p>

                <Link to="/artists" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>

              </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
