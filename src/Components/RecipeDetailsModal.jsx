import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../SmallComponents/Navbar';

export default function RecipeDetailsPage() {
  const [fullRecipe, setFullRecipe] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setFullRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError('Failed to load recipe details.');
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        {error}
      </div>
    );
  }

  if (!fullRecipe) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        Loading...
      </div>
    );
  }

  const ingredients =
    fullRecipe?.extendedIngredients?.map((i) => ({
      name: i.name,
      quantity: i.original,
    })) || [];

  // Filter only main macros + key micros
  const keyNutrients = [
    'Calories',
    'Protein',
    'Fat',
    'Carbohydrates',
    'Sugar',
    'Fiber',
    'Cholesterol',
    'Sodium'
  ];

  const nutrients =
    fullRecipe?.nutrition?.nutrients
      ?.filter((n) => keyNutrients.includes(n.name))
      .map((n) => ({
        name: n.name,
        amount: n.amount,
        unit: n.unit,
        percentOfDailyNeeds: n.percentOfDailyNeeds,
      })) || [];

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-purple-600 font-medium hover:text-purple-700 transition duration-300"
          >
            <span className="mr-2 text-xl">←</span> Back to Recipes
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {fullRecipe.title}
          </h1>
        </div>

        {/* Ingredients + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Ingredients
            </h3>
            {ingredients.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>
                    {ing.quantity} – {ing.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredients available.</p>
            )}
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <img
              src={fullRecipe.image}
              alt={fullRecipe.title}
              className="w-full md:w-2/3 lg:w-3/5 h-auto rounded-lg shadow-lg object-cover"
              style={{ maxHeight: 'calc(100% - 2rem)' }}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">
            Instructions
          </h3>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>Prep time:</strong>{' '}
              {fullRecipe.preparationMinutes ?? 'N/A'} mins
            </p>
            <p>
              <strong>Cook time:</strong>{' '}
              {fullRecipe.cookingMinutes ?? 'N/A'} mins
            </p>
            {fullRecipe.instructions ? (
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }}
              />
            ) : (
              <p className="text-gray-500">No instructions provided.</p>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Servings:{' '}
              <span className="font-medium">
                {fullRecipe.servings ?? 'N/A'}
              </span>{' '}
              | Ready in:{' '}
              <span className="font-medium">
                {fullRecipe.readyInMinutes ?? 'N/A'} mins
              </span>
            </p>

            {/* Main Macros & Micros */}
            {nutrients.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-purple-600 mb-2">
                  Key Nutrition
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {nutrients.map((n, idx) => (
                    <li key={idx}>
                      {n.name}: {n.amount} {n.unit} (
                      {n.percentOfDailyNeeds}% Daily)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
