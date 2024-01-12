import { recipes } from "../data/recipes.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.getElementById("recipes");
  for (const recipe of recipes) {
    console.log(recipe);
  }
};
displayRecipes(recipes);