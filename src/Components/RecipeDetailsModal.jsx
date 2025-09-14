import React from 'react';
import { createPortal } from 'react-dom';

const RecipeDetailsModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <img src={recipe.image} alt={recipe.title} className="w-full rounded-lg mb-4 object-cover h-48" />
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Instructions</h3>
          {/* Note: In a real API response, you would need to fetch this separately */}
          <p className="text-gray-600 leading-relaxed">Instructions are not available from the initial search API. You would need to make a separate API call for this recipe's details.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Macros (per serving)</h3>
            <p className="text-gray-600">Nutritional data is not available from the initial search API. This would require an additional API call.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Micros (per serving)</h3>
            <p className="text-gray-600">Nutritional data is not available from the initial search API. This would require an additional API call.</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RecipeDetailsModal;
