import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import IngredientsInput from './Components/IngredientsInput.jsx';
import RecipeList from './Components/RecipeList.jsx';
import RecipeDetailsModal from './Components/RecipeDetailsModal.jsx';
import LandingPage from "./Pages/LandingPage.jsx";
import SignIn from './Pages/SignIn.jsx';
import Register from './Pages/Register.jsx';
import About from './Pages/About.jsx';
import NutritionCalculator from './Pages/NutritionCalculator.jsx';
import FindRecipes from './Components/FindRecipes.jsx';
import Profile from './Pages/Profile.jsx';
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwindScript);

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/nutrition" element={<NutritionCalculator/>}/>
        <Route path="/find-recipes" element={<FindRecipes/>}/>
        <Route path="/ingredients" element={<IngredientsInput/>}/>
        <Route path="/recipes" element={<RecipeList/>}/>
        <Route path="/recipe-details/:id" element={<RecipeDetailsModal/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
