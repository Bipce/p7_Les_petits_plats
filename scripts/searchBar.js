import { recipes } from "../data/recipes.js";
import { displayRecipes, state } from "./index.js";

const searchBar = document.getElementById("searchbar");

const search = (e) => {
  const userSearch = e.target.value.toLowerCase();
  state.filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLowerCase().includes(userSearch)
      || recipes[i].description.toLowerCase().includes(userSearch)) {
      state.filteredRecipes.push(recipes[i]);
      continue;
    }

    for (const ingredient of recipes[i].ingredients) {
      if (ingredient.ingredient.toLowerCase().includes(userSearch)) {
        state.filteredRecipes.push(recipes[i]);
      }
    }
  }
  displayRecipes();
};

searchBar.addEventListener("input", (e) => {
  if (e.target.value.length > 2) {
    search(e);
  } else {
    state.filteredRecipes = [...recipes];
    displayRecipes();
  }
});