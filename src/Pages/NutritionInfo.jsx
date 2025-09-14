import React from "react";
import Navbar from "../SmallComponents/Navbar";
import Chatbot from "../SmallComponents/Chatbot";

const NutritionInfo = ({ dishName, macros, micros }) => {
  return (
    <>
    <Navbar/>
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nutrition Info</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get detailed nutritional information for your meals, including macros (protein, carbs, fats) and micros (vitamins & minerals).
          </p>
        </div>

        {/* Dish Name */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-700">{dishName}</h3>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold mb-2">Protein</h4>
            <p className="text-2xl font-bold text-violet-600">{macros.protein}g</p>
          </div>
          <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold mb-2">Carbs</h4>
            <p className="text-2xl font-bold text-violet-600">{macros.carbs}g</p>
          </div>
          <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold mb-2">Fats</h4>
            <p className="text-2xl font-bold text-violet-600">{macros.fats}g</p>
          </div>
        </div>

        {/* Micros Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-violet-100">
              <tr>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Micronutrient</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(micros).map(([key, value], idx) => (
                <tr
                  key={key}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-2 px-4">{key}</td>
                  <td className="py-2 px-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <Chatbot/>
    </>
  );
};

export default NutritionInfo;