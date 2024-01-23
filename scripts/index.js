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

const displayItemTag = (nameTag, dataRecipes) => {
  const tag = document.getElementById(nameTag);
  const arrTag = new Set();

  tag.innerHTML = "";

  for (const recipe of dataRecipes) {
    if (tag.id === "tag-ingredients") {
      for (const item of recipe.ingredients) {
        let ingredient = item.ingredient.toLowerCase();
        arrTag.add(ingredient);
      }
    } else if (tag.id === "tag-appliances") {
      arrTag.add(recipe.appliance);
    } else if (tag.id === "tag-utensils") {
      for (const item of recipe.utensils) {
        arrTag.add(item);
      }
    }
  }

  addInHTML(tag, arrTag);
};

const addInHTML = (tag, arrTag) => {
  for (let item of arrTag) {
    if (tag.id === "tag-ingredients" || tag.id === "tag-utensils") {
      item = item.charAt(0).toUpperCase() + item.slice(1);
    }
    tag.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
  }
};

export const displayIngredientsTag = (dataRecipes) => {
  displayItemTag("tag-ingredients", dataRecipes);
};

export const displayAppliancesTag = (dataRecipes) => {
  displayItemTag("tag-appliances", dataRecipes);
};

export const displayUtensilsTag = (dataRecipes) => {
  displayItemTag("tag-utensils", dataRecipes);
};

displayRecipes(recipes);