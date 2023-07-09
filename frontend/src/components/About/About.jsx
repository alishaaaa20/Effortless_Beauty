import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="about_section">
      <div className='container'>
        
          <div className='w-full lg:w-1/2 xl:w-[670px]'>
            <h2 className='heading text-primaryColor '>
              Why Us?
            </h2>
            <p className='text__para'>
              At Effortless Beauty, you can search to find all the local Makeup Artists in your area. With us, you can view each Makeup Artist's prices, services, reviews, and more. Booking a Makeup Artist is a fantastic way to get ready for a special event. Makeup Artists can also provide recommendations for skincare products and the types of makeup that will suit your skin type and complexion. They're trained and experienced in finding the right makeup for your skin type and hair.
            </p>
            <p className='text__para mt-[30px]'>
              Take a scroll around the block to see the best suitable makeup artist on Effortless Beauty. And more often than not, when we find the perfect balance, it creates magic! 
            </p>
            <Link to='/services'>
              <button className='btn'>Learn More</button>
            </Link>
        
        </div>
      </div>
    </section>
  );
};

export default About;
