import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../SmallComponents/Navbar';

export default function RecipeDetailsPage() {
  const [fullRecipe, setFullRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        const data = await res.json();
        setFullRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!fullRecipe) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        Loading...
      </div>
    );
  }

  const ingredients =
    fullRecipe.extendedIngredients?.map((i) => ({
      name: i.name,
      quantity: i.original,
    })) || [];

  return (
      <div>
      <Navbar/>
      {/* Main content area */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back to Recipes Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-purple-600 font-medium hover:text-purple-700 transition duration-300"
          >
            <span className="mr-2 text-xl">←</span> Back to Recipes
          </button>
        </div>

        {/* Recipe Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {fullRecipe.title}
          </h1>
        </div>

        {/* Layout for Ingredients, Image, and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ingredients Column (Left) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {ingredients.map((i, idx) => (
                <li key={idx}>
                  {i.original}
                </li>
              ))}
            </ul>
          </div>

          {/* Image Column (Middle) */}
          <div className="lg:col-span-2 flex justify-end"> {/* Use flex-end to push it right */}
            <img
              src={fullRecipe.image}
              alt={fullRecipe.title}
              className="w-full md:w-2/3 lg:w-3/5 h-auto rounded-lg shadow-lg object-cover" // Adjust width as needed
              style={{ maxHeight: 'calc(100% - 2rem)' }} // Match height to content next to it
            />
          </div>
        </div>
        
        {/* Instructions Section (Below image and ingredients) */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">Instructions</h3>
          <div className="text-gray-700 space-y-4">
            <p><strong>Prep time:</strong> {fullRecipe.preparationMinutes || 'N/A'} mins</p>
            <p><strong>Cook time:</strong> {fullRecipe.cookingMinutes || 'N/A'} mins</p>
            {fullRecipe.instructions && (
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }} // Using dangerouslySetInnerHTML for HTML from API
              />
            )}
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Servings: <span className="font-medium">{fullRecipe.servings || 'N/A'}</span> | 
              Ready in: <span className="font-medium">{fullRecipe.readyInMinutes || 'N/A'} mins</span>
            </p>
            {/* You can add more detailed nutrition info if available from API */}
            <p className="mt-2">
              Nutrition per serving: Approx. 41g Cal, 25g Fat, 15... (This would typically come from a dedicated nutrition endpoint or calculated client-side)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}