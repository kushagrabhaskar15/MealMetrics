import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import IngredientsInput from './Components/IngredientsInput.jsx';
import RecipeList from './Components/RecipeList.jsx';
import Chatbot from './SmallComponents/Chatbot.jsx';
import RecipeDetailsModal from './Components/RecipeDetailsModal.jsx';
import LandingPage from "./Pages/LandingPage.jsx";
import Navbar from './SmallComponents/Navbar.jsx';
import SignIn from './Pages/SignIn.jsx';
import Register from './Pages/Register.jsx';
import About from './Pages/About.jsx';
import NutritionInfo from './Pages/NutritionInfo.jsx';

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
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/nutrition-info" element={<NutritionInfo/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
