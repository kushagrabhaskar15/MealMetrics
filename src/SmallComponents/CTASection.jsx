import React from "react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Simplify Your Meals & Nutrition
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Find recipes based on your ingredients and track macros & micros effortlessly.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
        <Link
          to="/register"
          className="bg-violet-600 text-white font-medium px-8 py-3 rounded-full shadow-sm hover:bg-violet-700 transition duration-200"
        >
          Get Started
        </Link>
        <Link
          to="/recommend"
          className="border border-violet-600 text-violet-600 font-semibold px-8 py-3 rounded-full hover:bg-violet-50 transition duration-300"
        >
          Explore Recipes
        </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
