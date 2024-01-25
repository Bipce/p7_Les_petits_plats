import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";

const recipesSection = document.getElementById("recipes");
const recipesNbr = document.getElementById("recipesNumber");

export const state = {
  filteredRecipes: [...recipes],
};

export const displayRecipes = () => {
  recipesSection.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }
  recipesNbr.innerHTML = `${state.filteredRecipes.length} recettes`;
};

export const displayTag = (tag, data) => {
  tag.innerHTML = "";

  for (const item of data) {
    const display = item.charAt(0).toUpperCase() + item.slice(1);
    tag.innerHTML += `<p class="menu__selects__select__items__item">${display}</p>`;
  }
};

export const updateTag = (tag, targetFunc, search) => {
  const data = new Set();

  for (const recipe of state.filteredRecipes) {
    const target = targetFunc(recipe);
    for (const item of target) {
      const ret = item.toLowerCase();
      if (search.length <= 2 || ret.includes(search)) {
        data.add(ret);
      }
    }
  }
  displayTag(tag, data);
};

displayRecipes();