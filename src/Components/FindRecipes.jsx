import React, { useState } from "react";
import IngredientsInput from "./IngredientsInput";
import RecipeList from "./RecipeList";
import RecipeDetailsModal from "./RecipeDetailsModal";
import Navbar from "../SmallComponents/Navbar";

export default function FindRecipes() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!ingredients.length) return;
    setLoading(true);
    try {
      const query = ingredients.join(",");
      const res = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
      );
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      alert("Error fetching recipes", err," in find recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
      <IngredientsInput
        ingredients={ingredients}
        setIngredients={setIngredients}
        fetchRecipes={fetchRecipes}
        loading={loading}
      />

      {/* ✅ Recipe list stays visible because we never clear `recipes` */}
      {recipes.length > 0 && (
        <RecipeList recipes={recipes}/>
      )}

      <RecipeDetailsModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)
        }
      />
    </>
  );
}
