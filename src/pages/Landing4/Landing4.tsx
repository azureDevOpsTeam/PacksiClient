import React from 'react';
import Header from './Header/Header';
import HeroSection from './HeroSection/HeroSection';
import ServicesSection from './ServicesSection/ServicesSection';
import AboutSection from './AboutSection/AboutSection';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';
import ContactSection from './ContactSection/ContactSection';
import FooterSection from './FooterSection/FooterSection';

function Landing4() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e2544] via-[#12344d] to-[#2b4d61]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default Landing4;