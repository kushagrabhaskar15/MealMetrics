import React from 'react'
import HeroSection from '../SmallComponents/HeroSection'
import Footer from '../SmallComponents/Footer'
import CtaSection from '../SmallComponents/CTASection'
import FeaturesSection from '../SmallComponents/FeaturesSection'
import Navbar from "../SmallComponents/Navbar"
import Chatbot from '../SmallComponents/Chatbot'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <FeaturesSection/>
        <CtaSection/>
        <Chatbot/>
        <Footer/>
    </div>
  )
}

export default LandingPage