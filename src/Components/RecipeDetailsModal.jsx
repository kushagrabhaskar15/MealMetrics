import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function RecipeDetailsModal({ recipe, onClose }) {
  const [fullRecipe, setFullRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=YOUR_API_KEY`
        );
        const data = await res.json();
        setFullRecipe(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
  }, [recipe]);

  if (!fullRecipe) return null;

  const ingredients =
    fullRecipe.extendedIngredients?.map((i) => ({
      name: i.name,
      quantity: i.original,
    })) || [];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={fullRecipe.image}
            alt={fullRecipe.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-4 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800">{fullRecipe.title}</h2>

          {ingredients.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {ingredients.map((i, idx) => (
                  <li key={idx}>
                    <span className="font-medium text-gray-800">{i.name}</span>
                    {i.quantity && <span className="text-gray-500"> – {i.quantity}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {fullRecipe.instructions && (
            <section>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {fullRecipe.instructions}
              </p>
            </section>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  )}
