import React from 'react'

function FindRecpies() {
  return (
    <div><div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-tight">
          AI Recipe Generator
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your ingredients to find recipes and their nutritional info!
        </p>

        <IngredientsInput 
          ingredients={ingredients}
          setIngredients={setIngredients}
          fetchRecipes={fetchRecipes}
          loading={loading}
        />
        
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeList key={recipe.id} recipe={recipe} onSelectRecipe={setSelectedRecipe} />
            ))}
          </div>
        )}
      </div>
      <RecipeDetailsModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div></div>
  )
}

export default FindRecpies