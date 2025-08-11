import React from 'react';
import FeatureSection from './FeatureSection/FeatureSection';
import FooterSection from './FooterSection/FooterSection';
import Faqsection from './FAQSection/Faqsection';
import Header from './Header/Header';
import HeroSection from './HeroSection/HeroSection';
import LastTravel from './LastTravel/LastTravel';
import HowItWorkSection from './HowItWorkSection/HowItWorkSection';
import DrivingTraining from './FeatureSection/DrivingTraining'; 
import HouseRent from '../Landing/FeatureSection/HouseRent';
import Testimonials from './Testimonials/Testimonials';

function Landing() {
  return (
    <div className='h-[3500px]'>
      
  <Header />

 <HeroSection/>
<LastTravel/>
        <FeatureSection/>
        <DrivingTraining/>
        <HouseRent/>
        <FooterSection/>
        {/* <FooterSection/>
        <Faqsection/>
      
       
        <HowItWorkSection/>
        <Testimonials/>  */}

    </div>
  )
}

export default Landing