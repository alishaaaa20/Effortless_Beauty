import React from 'react';
import icons02 from '../assets/images/icon02.png';
import icons03 from '../assets/images/icon03.png';
import icons04 from '../assets/images/khalti-logo.jpg';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/About/About';
import ServiceList from '../components/Services/ServiceList';
import makeupArtist from '../assets/images/makeupArtist.png';

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
                <Link to="/artists">
                  <button className="btn">Request a Booking</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*-----hero__section end ------*/}

      {/*-----how it works section-----*/}
      <section>
        <div className='container'>
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center text-[40px]'>
              Need a Makeup Artist? We've got you.
            </h2>
            <p className="text__para text-center">
            Just a few clicks away from your perfect makeup artist.
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
                  We have a perfect makeup artist near you.
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
                  We have a perfect makeup artist near you.
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
      {/*-----how it works section end-----*/}

      {/*-----makeup artist register section-----*/}
      <section>
        <div className='container'>
           <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
             {/*-----makeup artist image-----*/}
             <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                <img src={makeupArtist} alt="" height={500} width={500} />
             </div>

             <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 '>
            <h2 className='heading text-primaryColor text-center mt-[30px]'>
              Want to Earn with us?
            </h2>
            <p className='text__para mt-[30px] text-[18px]'>
               We provide a platform for you to showcase your talent and earn with us. You'll get more reach to the large audience. <br />
         
            </p>
            <ul className='pl-6 mt-[30px]'>
            <li className='text__para'> 1. Provide service at any time and on any day of the week.</li>
             <li className='text__para'> 2. Reach out to more customers and grow your business more.</li>
             <li className='text__para'> 3. Booking and Scheduling is much more easier.</li>
             <li className='text__para'> 4. Get your payment on time.</li>
        </ul>
               
               

         
             
            
            <Link to='/login'>
              <button className='btn'>Register Now</button>
            </Link>
        
        </div>
           </div>
        </div>
      </section>
      {/*-----makeup artist register section ends-----*/}

      <About />

      {/*-----services section starts-----*/}
      <section>
        <div className='container'>
          <div className="xl:w-[470px] mx-auto">
            <h2 className='heading text-center'>
              Our Servies
            </h2>
            <p className='text__para text-center'>
              We provide  Makeup Artists for all occasions. Have a Look and choose yours.
            </p>
          </div>

          <ServiceList />

          {/*-----services section ends-----*/}

         {/*-----features section starts-----*/}

         <section>
          <div className='container'>
            <div className='flex items-center justify-between flex-col lg:flex-row'>
               {/*-----feature content-----*/}
               <div className='xl:w-[700px]'>
                  <h2 className='heading'>
                    Get Virtual Booking <br /> Anytime, Anywhere.
                  </h2>

                  <ul className='pl-6 mt-[30px]'>
                     <li className='text__para'>
                      1. Schedule the booking directly with the makeup artist.
                     </li>
                     <li className='text__para'>
                      2. Search the makeup artist near you.
                     </li>
                     <li className='text__para'>
                      3. View our makeup artist's profile and choose the best one.
                     </li>
                     <li className='text__para'>
                      4. Use the  Scheduling system to book the date and time.
                     </li>
                     <li className='text__para'>
                      5. Make a pre-payment through Khalti.
                     </li>
                     <li className='text__para'>
                      6. After that, see the makeup artist at your doorstep.
                     </li>
                  </ul>
               </div>
            </div>

          </div>
         </section>
         {/*-----features section ends-----*/}
        </div>
      </section>




      {/*-----services section ends-----*/}
    </>
  );
};

export default Home;



