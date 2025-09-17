import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe, onSelect }) {
  const navigate = useNavigate(); 
  return (
    <article className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
      <button
        type="button"
        onClick={()=>navigate(`/recipe-details/${recipe.id}`)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition shadow"
      >
        View Details
      </button>
    </article>
  );
}
