import React from 'react';

const RecipeCard = ({ recipe, onSelectRecipe }) => {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
    >
      <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
      <button
        onClick={() => onSelectRecipe(recipe)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-200 shadow-md"
      >
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;
