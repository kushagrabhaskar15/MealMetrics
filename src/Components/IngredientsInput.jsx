import React, { useState } from 'react';

export default function IngredientsInput({ ingredients, setIngredients, fetchRecipes, loading }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setIngredients([...ingredients, inputValue.trim()]);
    setInputValue('');
  };

  const handleRemove = (i) => {
    setIngredients(ingredients.filter((_, idx) => idx !== i));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 mr-40 ml-40 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Ingredients</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="e.g., chicken, spinach"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleAdd}
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
              onClick={() => handleRemove(index)}
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
        {loading ? 'Finding Recipes…' : 'Find Recipes'}
      </button>
    </div>
  );
}
