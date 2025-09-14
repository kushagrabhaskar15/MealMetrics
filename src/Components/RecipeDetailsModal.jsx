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
        {/* Header */}
        <header className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </header>

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-lg mb-6 object-cover h-56"
        />

        {/* Instructions */}
        {recipe.instructions && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {recipe.instructions}
            </p>
          </section>
        )}

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Ingredients Needed</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>
                  <span className="font-medium text-gray-800">{item.name}</span>
                  {item.quantity && (
                    <span className="text-gray-500"> – {item.quantity}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Macros & Micros */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Macros</h3>
            {recipe.macros ? (
              <ul className="text-gray-600 space-y-1">
                {Object.entries(recipe.macros).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    {key}: <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No macro data available.</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Micros</h3>
            {recipe.micros ? (
              <ul className="text-gray-600 space-y-1">
                {Object.entries(recipe.micros).map(([key, value]) => (
                  <li key={key} className="capitalize">
                    {key}: <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No micro data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
