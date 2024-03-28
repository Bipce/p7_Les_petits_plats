import { recipes } from "../data/recipes.js";
import { displayRecipes, state } from "./index.js";
import { displaySelectedItemInMenuDiv } from "./selects/display.js";
import { recipesSection } from "./utils/constantes.js";

const searchBar = document.getElementById("searchbar");
const tagsLists = document.querySelectorAll(".menu__selects__select");

/**
 * Global search for the recipes
 * @param {Event} e
 * @return {string}
 */
const searchRecipes = (e) => {
  const userSearch = e.target.value.toLowerCase();

  state.currentRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(userSearch) ||
    recipe.description.toLowerCase().includes(userSearch) ||
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(userSearch)),
  );

  // Set "state.searchRecipes" to a copy of "state.currentsRecipes" to avoid doing do the all process of the global search again.
  state.searchedRecipes = [...state.currentRecipes];
  displayRecipes();

  if (recipesSection.children.length === 0) {
    recipesSection.innerHTML = `<p class="recipes__errMsg">Aucune recette ne contient "${userSearch}"</p>`;
  }
};

searchBar.addEventListener("click", () => {
  // Reset recipes
  state.selectedIngredients = [];
  state.selectedAppliances = [];
  state.selectedUtensils = [];
  state.currentRecipes = [...recipes];
  state.searchedRecipes = [...recipes];
  displaySelectedItemInMenuDiv();
  displayRecipes();
  searchBar.value = "";

  // Close every tagList
  tagsLists.forEach(tagList => {
    tagList.setAttribute("isOpen", "false");
    tagList.children[2].style.display = "none";
  });
});

searchBar.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    searchRecipes(e);
  } else {
    state.currentRecipes = [...recipes];
    state.searchedRecipes = [...recipes];
    displayRecipes();
  }
});