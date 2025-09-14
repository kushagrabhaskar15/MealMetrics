import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose MealMetrics
          </h2>
          <p className="text-gray-600">
            Discover dishes based on your ingredients and get clear nutritional insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold mb-2">Ingredient-Based Recipes</h3>
            <p className="text-gray-600 text-sm">
              Simply enter what you have at home and get meal suggestions instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Macros & Micros</h3>
            <p className="text-gray-600 text-sm">
              Get detailed nutritional breakdown including calories, proteins, carbs, fats, and vitamins.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick & Simple</h3>
            <p className="text-gray-600 text-sm">
              No complicated setups—start finding meals and tracking nutrition instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
