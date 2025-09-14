import React from "react";

const CtaSection = () => {
  return (
    <section className="bg-gray-50 py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Intro heading */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          
          {/* Left big statement */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight md:w-1/2">
            Food is data.  
            <span className="block text-violet-600">
              Read it. Use it. Enjoy it.
            </span>
          </h2>

          {/* Right editorial text */}
          <div className="md:w-1/2 text-gray-600 text-lg leading-relaxed">
            <p className="mb-6">
              Behind every meal is a story—of ingredients, nutrients, and balance.  
              MealMetrics helps you decode that story so every dish becomes both
              delicious and nourishing.
            </p>
            <p>
              Track the tiny details. Discover unexpected recipes.  
              Build a healthier relationship with what you eat—one smart choice at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;