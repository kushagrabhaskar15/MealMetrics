import React from 'react';
import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-white pt-16 pb-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Your Solution</span> to a Tasty & Healthy Lifestyle
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Smart Meals, Smarter Nutrition: Recipes Tailored to Your Ingredients & Macros.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signin" className="bg-violet-600 text-white font-medium px-8 py-3 rounded-full shadow-lg transition duration-300 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
              Get Started
            </Link>
            <Link to="find-recipes" className="bg-white text-violet-600 font-medium px-8 py-3 rounded-full border border-violet-300 transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50">
              Explore Recipes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
