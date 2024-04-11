import { recipes } from "../data/recipes.js";
import { displayRecipes, state } from "./index.js";
import { displaySelectedItemInMenuDiv } from "./selects/display.js";
import { recipesSection } from "./utils/constantes.js";

const searchBar = document.querySelector("#searchbar");
const tagsLists = document.querySelectorAll(".menu__selects__select");

/**
 * Global search for the recipes
 * @param {Event} e
 * @return {string}
 */
const searchRecipes = (e) => {
  const userSearch = e.target.value.toLowerCase();
  state.currentRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLowerCase().includes(userSearch)
      || recipes[i].description.toLowerCase().includes(userSearch)) {
      state.currentRecipes.push(recipes[i]);
      continue;
    }

    for (const ingredient of recipes[i].ingredients) {
      if (ingredient.ingredient.toLowerCase().includes(userSearch)) {
        state.currentRecipes.push(recipes[i]);
        break;
      }
    }
  }

  // Set "state.searchRecipes" to a copy of "state.currentsRecipes" to avoid doing do the all process of the global search again.
  state.searchedRecipes = [...state.currentRecipes];
  displayRecipes();

  if (recipesSection.children.length === 0) {
    recipesSection.innerHTML = `<p class="recipes__errMsg">Aucune recette ne contient "${userSearch}"</p>`;
  }
};

searchBar.addEventListener("click", () => {
  if ((state.selectedIngredients.length || state.selectedAppliances || state.selectedUtensils) > 0) {
    // Reset recipes
    state.selectedIngredients = [];
    state.selectedAppliances = [];
    state.selectedUtensils = [];
    state.currentRecipes = [...recipes];
    state.searchedRecipes = [...recipes];
    searchBar.value = "";
    displayRecipes();
  }

  displaySelectedItemInMenuDiv();
  // Close every tagList
  tagsLists.forEach(tagList => {
    tagList.setAttribute("data-isOpen", "false");
    tagList.children[2].style.display = "none";
  });
});

searchBar.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    searchRecipes(e);
  } else {
    // Display all recipes if not 3 letters
    state.currentRecipes = [...recipes];
    state.searchedRecipes = [...recipes];
    displayRecipes();
  }
});