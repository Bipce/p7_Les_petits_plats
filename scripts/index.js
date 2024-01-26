import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";

const recipesSection = document.getElementById("recipes");
const recipesNbr = document.getElementById("recipesNumber");

export const state = {
  filteredRecipes: [...recipes],
  selectedIngredients: [],
  selectedAppliances: [],
  selectedUtensils: [],
};

export const displayRecipes = () => {
  recipesSection.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }
  recipesNbr.innerHTML = `${state.filteredRecipes.length} recettes`;
};

export const displayTag = (tag, tagData) => {
  const sortedTagData = [...tagData];

  tag.innerHTML = "";

  sortedTagData.sort();

  for (const item of sortedTagData) {
    const display = item.charAt(0).toUpperCase() + item.slice(1);
    tag.innerHTML += `<p class="menu__selects__select__items__item">${display}</p>`;
  }
};

export const updateTag = (tag, targetTagFunc, userSearch) => {
  const tagData = new Set();
  for (const recipe of state.filteredRecipes) {
    const tagsArray = targetTagFunc(recipe);
    for (const item of tagsArray) {
      const itemLowerCase = item.toLowerCase();
      if (itemLowerCase.includes(userSearch)) {
        tagData.add(itemLowerCase);
      }
    }
  }
  displayTag(tag, tagData);
};

displayRecipes();