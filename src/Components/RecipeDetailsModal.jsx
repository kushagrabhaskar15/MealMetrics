import React from 'react';
import { createPortal } from 'react-dom';

export default function RecipeDetailsModal({ recipe, onClose }) {
  if (!recipe) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <header className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-lg mb-4 object-cover h-48"
        />

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions</h3>
          <p className="text-gray-600 leading-relaxed">
            Instructions are not included in the initial search.  
            Make an additional API call for full recipe steps.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Macros</h3>
            <p className="text-gray-600">
              Nutritional data requires a separate API call.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Micros</h3>
            <p className="text-gray-600">
              Nutritional data requires a separate API call.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
