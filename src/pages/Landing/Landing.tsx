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
  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLargeScreen = screenHeight > 1080;

  return (
    <>
   
    <div className='max-w-[1440px] mx-auto min-h-screen'>
      
  <Header screenHeight={screenHeight} isLargeScreen={isLargeScreen} />

 <HeroSection screenHeight={screenHeight} isLargeScreen={isLargeScreen} />
<LastTravel/>
        <FeatureSection/>
        <DrivingTraining/>
        <HouseRent/>
    
        {/* <FooterSection/>
        <Faqsection/>
      
       
        <HowItWorkSection/>
        <Testimonials/>  */}

    </div>
        <FooterSection/>
     </>
  )
}

export default Landing