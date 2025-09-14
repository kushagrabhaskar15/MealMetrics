# MealMetrics

**MealMetrics** is a modern, responsive web application built with React that helps users find recipes based on ingredients they have at home. It fetches detailed recipe information, including ingredients, instructions, macros, and micros, from the Spoonacular API. Users can explore recipes, view ingredient lists, and get nutritional insights for each dish.

---

## Features

* **Ingredient-based recipe search:** Users can add the ingredients they have and find matching recipes.
* **Recipe details:** View full recipe information including image, ingredients, instructions, and nutritional information.
* **Macros & Micros:** Displays nutritional breakdown for each recipe.
* **Responsive design:** Works well on desktop, tablet, and mobile devices.
* **Full-page recipe view:** Recipe details open in a clean full-page modal for better readability.

---

## Demo

The app is still being worked on and not deployed.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **API:** Spoonacular API
* **State Management:** React hooks (`useState`, `useEffect`)
* **Build Tools:** Vite

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/MealMetrics.git
cd MealMetrics
```

2. **Install dependencies**

```bash
npm install
```

3. **Add Spoonacular API key**

* Create a `.env` file in the root directory:

```
REACT_APP_SPOONACULAR_API_KEY=YOUR_API_KEY
```

4. **Start the development server**

```bash
npm run dev
```

* The app will run at `http://localhost:5173` (default Vite port).

---

## Usage

1. Enter ingredients you have in the search bar.
2. Click **Add** to include them in the list.
3. Click **Find Recipes** to fetch recipes from the Spoonacular API.
4. Browse the recipe cards and click **View Details** to see full information.

---

## Folder Structure

```
MealMetrics/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ IngredientsInput.jsx
│  │  ├─ RecipeCard.jsx
│  │  ├─ RecipeList.jsx
│  │  └─ RecipeDetailsModal.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

---

## API Reference

* **Spoonacular Recipes API:** [https://spoonacular.com/food-api](https://spoonacular.com/food-api)
* Endpoints used:

  * `GET /recipes/findByIngredients` — Fetch recipes based on available ingredients
  * `GET /recipes/{id}/information` — Fetch detailed recipe information

---

## Contributing

Contributions are welcome!

* Fork the repository
* Create a new branch: `git checkout -b feature/your-feature`
* Commit your changes: `git commit -m "Add feature"`
* Push to the branch: `git push origin feature/your-feature`
* Open a pull request

---

## License

This project is licensed under the **MIT License**.

---

## Contact

* **Project Author:** Kushagra Bhaskar
* **Email:** `kushagrabhaskar05@gmail.com`
* **GitHub:** [https://github.com/kushagrabhaskar15](https://github.com/kushagrabhaskar15)
