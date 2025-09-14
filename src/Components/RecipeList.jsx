import React, { useState } from 'react';
import RecipeCard from './RecipeCard.jsx';
import RecipeDetailsModal from './RecipeDetailsModal.jsx';

export default function RecipeList({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      {/* Show modal if a recipe is selected */}
      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
