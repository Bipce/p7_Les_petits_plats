import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";
import { Ingredient } from "./templates/Ingredient.js";

export const displayRecipes = (data) => {
  const recipesSection = document.getElementById("recipes");
  const recipesNbr = document.getElementById("number-recipes");
  const tagIngredients = document.getElementById("tag-ingredients");
  const ingredients = [];

  tagIngredients.innerHTML = "";
  recipesSection.innerHTML = "";

  for (const recipe of data) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();

    for (const item of recipe.ingredients) {
      const ingredient = item.ingredient.toLowerCase();

      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        tagIngredients.innerHTML += `<p>${ingredient}</p>`;
      }
    }
  }

  const ingredientsSections = document.querySelectorAll(".recipes__article__content__ingredients__box");

  for (let i = 0; i < data.length; i++) {
    for (const ingredient of data[i].ingredients) {
      const ingredientModel = new Ingredient(ingredient);
      ingredientsSections[i].innerHTML += ingredientModel.getIngredientsDOMPage();
    }
  }

  recipesNbr.innerHTML = `${data.length} recettes`;
};

displayRecipes(recipes);