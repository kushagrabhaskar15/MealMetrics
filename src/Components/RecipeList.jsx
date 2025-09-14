import React from 'react';
import RecipeCard from './RecipeCard.jsx';

export default function RecipeList({ recipes = [], onSelectRecipe }) {
  if (!recipes.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No recipes found. Try adding more ingredients or adjust your search.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onSelectRecipe={onSelectRecipe}
        />
      ))}
    </div>
  );
}
