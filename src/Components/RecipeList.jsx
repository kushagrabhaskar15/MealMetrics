import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const RecipeList = ({ recipes, onSelectRecipe }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
      ))}
    </div>
  );
};

export default RecipeList;
