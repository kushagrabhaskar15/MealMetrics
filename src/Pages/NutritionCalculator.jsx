import React, { useState } from "react";
import Navbar from "../SmallComponents/Navbar";
import Chatbot from "../SmallComponents/Chatbot";

export default function NutritionCalculator() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "male",
    activity: "moderate",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculate = (e) => {
    e.preventDefault();
    const { height, weight, age, gender, activity } = formData;
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    if (!h || !w || !a) return;

    // Basal Metabolic Rate (Mifflin–St Jeor)
    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const activityFactor = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very: 1.9,
    }[activity];

    const calories = Math.round(bmr * activityFactor);

    // Simple macro split: 50% carbs, 20% protein, 30% fat
    const protein = Math.round((0.20 * calories) / 4);
    const carbs = Math.round((0.50 * calories) / 4);
    const fats = Math.round((0.30 * calories) / 9);

    // Sample micros (RDA ballpark)
    const micros = {
      "Vitamin C": "75–90 mg",
      "Calcium": "1000 mg",
      "Iron": gender === "male" ? "8 mg" : "18 mg",
      "Potassium": "3500–4700 mg",
    };

    setResult({ calories, protein, carbs, fats, micros });
  };

  return (
    <>
      <Navbar />
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Daily Nutrition Calculator
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Enter your details to estimate how much protein, carbs, fats, and
              key micronutrients you should consume each day.
            </p>
          </div>

          {/* Input Form */}
          <form
            onSubmit={calculate}
            className="max-w-lg mx-auto grid grid-cols-1 gap-6 bg-violet-50 p-6 rounded-xl shadow-md"
          >
            <div>
              <label className="block font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Age (years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Activity Level</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very">Very Active</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
            >
              Calculate
            </button>
          </form>

          {/* Results */}
          {result && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-6">
                Your Daily Targets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
                  <h4 className="text-lg font-semibold mb-2">Calories</h4>
                  <p className="text-2xl font-bold text-violet-600">
                    {result.calories} kcal
                  </p>
                </div>
                <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
                  <h4 className="text-lg font-semibold mb-2">Protein</h4>
                  <p className="text-2xl font-bold text-violet-600">
                    {result.protein} g
                  </p>
                </div>
                <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center">
                  <h4 className="text-lg font-semibold mb-2">Carbs</h4>
                  <p className="text-2xl font-bold text-violet-600">
                    {result.carbs} g
                  </p>
                </div>
                <div className="bg-violet-50 p-6 rounded-lg shadow-md text-center md:col-span-3">
                  <h4 className="text-lg font-semibold mb-2">Fats</h4>
                  <p className="text-2xl font-bold text-violet-600">
                    {result.fats} g
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-violet-100">
                    <tr>
                      <th className="py-2 px-4 text-left font-medium text-gray-700">
                        Micronutrient
                      </th>
                      <th className="py-2 px-4 text-left font-medium text-gray-700">
                        Recommended Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.micros).map(([key, value], idx) => (
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
          )}
        </div>
      </section>
      <Chatbot />
    </>
  );
}
