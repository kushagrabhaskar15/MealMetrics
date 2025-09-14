import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import IngredientsInput from './Components/IngredientsInput.jsx';
import RecipeList from './Components/RecipeList.jsx';
import RecipeDetailsModal from './Components/RecipeDetailsModal.jsx';
import LandingPage from "./Pages/LandingPage.jsx";
import SignIn from './Pages/SignIn.jsx';
import Register from './Pages/Register.jsx';
import About from './Pages/About.jsx';
import NutritionInfo from './Pages/NutritionInfo.jsx';
import FindRecipes from './Components/FindRecipes.jsx';

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
    
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const ingredientsString = ingredients.join(',').toLowerCase();

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=10&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error('API request failed. Check your API key and network connection.');
      }
      const data = await response.json();
      
      setRecipes(data);
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/nutrition" element={<NutritionInfo/>}/>
        <Route path="/find" element={<FindRecipes/>}/>
        <Route path="/ingredients" element={<IngredientsInput/>}/>
        <Route path="/recipes" element={<RecipeList/>}/>
        <Route path="/recipedetails" element={<RecipeDetailsModal/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
