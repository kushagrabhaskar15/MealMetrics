import React from "react";
import Navbar from "../SmallComponents/Navbar";
import Chatbot from "../SmallComponents/Chatbot";

const About = () => {
  return (
    <>
    <Navbar/>
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About MealMetrics</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            MealMetrics helps you discover dishes based on the ingredients you have at home and provides detailed nutritional information including macros and micros for each meal.
          </p>
        </div>

        {/* Features / Info Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🍲</div>
            <h3 className="text-xl font-semibold mb-2">Ingredient-based Recipes</h3>
            <p className="text-gray-600">
              Enter the ingredients you have and get a curated list of dishes you can cook right now.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Macros & Micros</h3>
            <p className="text-gray-600">
              Get detailed nutritional info for every dish, including calories, protein, carbs, fats, vitamins, and minerals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-gray-600">
              Save time and eat healthy. Our smart recommendations help you plan meals efficiently without guesswork.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Chatbot/>
    </>
  );
};

export default About;
