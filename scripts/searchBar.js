import { recipes } from "../data/recipes.js";
import { displayRecipes, state } from "./index.js";
import { displaySelectedItemInMenuDiv } from "./selects/display.js";

const searchBar = document.getElementById("searchbar");
const tagsLists = document.querySelectorAll(".menu__selects__select");

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

  state.searchedRecipes = [...state.currentRecipes];
  displayRecipes();
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