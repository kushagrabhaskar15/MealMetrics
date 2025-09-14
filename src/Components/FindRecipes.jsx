import React, { useState } from "react";
import RecipeList from "./RecipeList";
import RecipeDetailsModal from "./RecipeDetailsModal";
import Navbar from "../SmallComponents/Navbar";
import axios from "axios";

export default function FindRecipes() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = () => {
    if (!inputValue.trim()) return;
    setIngredients([...ingredients, inputValue.trim()]);
    setInputValue("");
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const fetchRecipes = async () => {
    if (!ingredients.length) return;
    setLoading(true);
    try {
      const query = ingredients.join(",");
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
          query
        )}&apiKey=69085e0d986745d7b746713a96a2683c`
      );
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes", err);
      alert("Failed to fetch recipes. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          AI Recipe Generator
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your ingredients to find recipes and their nutritional info!
        </p>

        {/* Ingredients Input */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Your Ingredients
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
              placeholder="e.g., chicken, spinach"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={handleAddIngredient}
              className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors shadow"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {ingredients.map((ing, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                {ing}
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 text-indigo-500 hover:text-indigo-700"
                  aria-label={`Remove ${ing}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={fetchRecipes}
            disabled={!ingredients.length || loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition disabled:bg-indigo-400 shadow-md"
          >
            {loading ? "Finding Recipes…" : "Find Recipes"}
          </button>
        </div>

        {/* Recipe List */}
        {recipes.length > 0 && (
          <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
        )}

        {/* Recipe Modal */}
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      </section>
    </>
  );
}
