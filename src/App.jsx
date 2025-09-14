import React, { useState } from 'react';
import IngredientsInput from './Components/IngredientsInput.jsx';
import RecipeList from './Components/RecipeList.jsx';
import Chatbot from './Components/Chatbot.jsx';
import RecipeDetailsModal from './Components/RecipeDetailsModal.jsx';

// Add the Tailwind CSS script dynamically to the HTML head
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwindScript);

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    
    // Yahan apni Spoonacular API key daalo
    const apiKey = 'YOUR_SPOONACULAR_API_KEY';
    const ingredientsString = ingredients.join(',').toLowerCase();

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('API request failed. Check your API key and network connection.');
      }
      const data = await response.json();
      
      // Note: Spoonacular ka response thoda alag hota hai.
      // `findByIngredients` sirf title, image aur ID deta hai.
      // Macros aur micros ke liye tumhe har recipe ke liye ek aur alag API call karni padegi.
      // Isiliye, maine abhi "View Details" modal mein placeholders daale hain.
      
      setRecipes(data);
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
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
      <Chatbot />
    </div>
  );
};

export default App;
