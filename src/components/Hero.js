import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import KidsBanner from '../img/banner_kids.png';
import MensBanner from '../img/banner_mens.png';
import WomensBanner from '../img/banner_women.png';

const Hero = () => {
  const slides = [
    {
      title: "AUTUMN SALE STYLISH",
      subtitle: "WOMENS",
      img: WomensBanner,
      cta: "Discover More",
      link: "/",
    },
    {
      title: "WINTER COLLECTION",
      subtitle: "MENS",
      img: MensBanner,
      cta: "Shop Now",
      link: "/shop",
    },
    {
      title: "SUMMER FASHION",
      subtitle: "KIDS",
      img: KidsBanner,
      cta: "Explore",
      link: "/explore",
    },
  ];

  return (
    <section className='h-[500px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto h-full px-10'>
        <Carousel>
          {slides.map((slide, index) => (
            <div key={index} className='flex justify-around h-full'>
              {/* text */}
              <div className='flex flex-col justify-center'>
                <div className='font-semibold flex items-center uppercase'>
                  <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
                  <span>NEW ARRIVALS</span>
                </div>
                <h1 className='text-[70px] leading-[1.1] font-light'>
                  {slide.title} <br />
                  <span className='font-semibold'>{slide.subtitle}</span>
                </h1>
                <Link to={slide.link} className='self-start font-semibold uppercase border-b-2 border-primary'>
                  {slide.cta}
                </Link>
              </div>
              {/* image */}
              <div className='hidden lg:block'>
                <img src={slide.img} alt={slide.subtitle} className='shadow-lg rounded-lg' />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;