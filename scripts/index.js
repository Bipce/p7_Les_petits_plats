import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";
import { Ingredient } from "./templates/Ingredient.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.getElementById("recipes");
  const recipesNbr = document.getElementById("number-recipes");

  for (const recipe of recipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }

  const ingredientsSections = document.querySelectorAll(".recipes__article__content__ingredients__box");

  for (let i = 0; i < recipes.length; i++) {
    for (const ingredient of recipes[i].ingredients) {
      const ingredientModel = new Ingredient(ingredient);
      ingredientsSections[i].innerHTML += ingredientModel.getIngredientsDOMPage();
    }
  }

  recipesNbr.innerHTML = `${recipes.length} recettes`;
};

displayRecipes(recipes);