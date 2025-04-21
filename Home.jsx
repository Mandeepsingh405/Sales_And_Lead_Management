import React from "react";
import HeroSection from "./landingPage/HeroSection";
import AboutUs from "./landingPage/AboutUs";
import StatsSection from "./landingPage/StatsSection";
import FeaturesSection from "./landingPage/FeaturesSection";
import Footer from "./landingPage/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}
export default Home;