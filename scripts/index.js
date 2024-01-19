import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";

export const displayRecipes = (data) => {
  const recipesSection = document.getElementById("recipes");
  const recipesNbr = document.getElementById("number-recipes");

  recipesSection.innerHTML = "";

  for (const recipe of data) {
    const recipeModel = new Recipe(recipe);

    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
    recipesNbr.innerHTML = `${data.length} recettes`;
  }
};

export const displayIngredientsTag = (dataRecipes) => {
  const tagIngredients = document.getElementById("tag-ingredients");
  let ingredients = new Set();

  tagIngredients.innerHTML = "";

  for (const recipe of dataRecipes) {
    for (const item of recipe.ingredients) {
      const ingredient = item.ingredient.toLowerCase();

      ingredients.add(ingredient);
    }
  }

  for (let ingredient of ingredients) {
    ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
    tagIngredients.innerHTML += `<p class="menu__selects__select__ingredients__ingredient">${ingredient}</p>`;
  }
};

displayRecipes(recipes);