import { recipes } from "../data/recipes.js";
import { Recipe } from "./templates/Recipe.js";

export const filteredRecipes = [...recipes];

export const displayRecipes = () => {
  const recipesSection = document.getElementById("recipes");
  const recipesNbr = document.getElementById("number-recipes");

  recipesSection.innerHTML = "";

  for (const recipe of filteredRecipes) {
    const recipeModel = new Recipe(recipe);

    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
    recipesNbr.innerHTML = `${filteredRecipes.length} recettes`;
  }
};

const displayItemTag = (nameTag, dataRecipes, search) => {
  const tag = document.getElementById(nameTag);
  const arrTag = new Set();

  tag.innerHTML = "";

  for (const recipe of dataRecipes) {
    if (tag.id === "tag-ingredients") {
      for (const item of recipe.ingredients) {
        let ingredient = item.ingredient.toLowerCase();
        if (search.length <= 2 || ingredient.includes(search)) {
          ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
          arrTag.add(ingredient);
        }
      }
    } else if (tag.id === "tag-appliances") {
      if (search.length <= 2 || recipe.appliance.toLowerCase().includes(search)) {
        arrTag.add(recipe.appliance);
      }
    } else if (tag.id === "tag-utensils") {
      for (let item of recipe.utensils) {
        if (search.length <= 2 || item.toLowerCase().includes(search)) {
          item = item.charAt(0).toUpperCase() + item.slice(1);
          arrTag.add(item);
        }
      }
    }
  }

  addInHTML(tag, arrTag);
};

const addInHTML = (tag, arrTag) => {
  for (let item of arrTag) {
    tag.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
  }
};

export const displayIngredientsTag = (dataRecipes, search) => {
  displayItemTag("tag-ingredients", dataRecipes, search);
};

export const displayAppliancesTag = (dataRecipes, search) => {
  displayItemTag("tag-appliances", dataRecipes, search);
};

export const displayUtensilsTag = (dataRecipes, search) => {
  displayItemTag("tag-utensils", dataRecipes, search);
};

displayRecipes();