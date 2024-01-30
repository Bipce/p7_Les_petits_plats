import { Recipe } from "./templates/Recipe.js";
import { recipes } from "../data/recipes.js";

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

export const displayTag = (tag, tagData, selectedItemsDiv, stateName) => {
  const sortedTagData = [...tagData];

  tag.innerHTML = "";
  selectedItemsDiv.innerHTML = "";

  sortedTagData.sort();

  for (const item of sortedTagData) {
    const display = item.charAt(0).toUpperCase() + item.slice(1);
    if (state[stateName].includes(display)) {
      selectedItemsDiv.innerHTML += `<p class="menu__selects__select__items__item" isSelected="true">${display}</p>`;
    } else {
      tag.innerHTML += `<p class="menu__selects__select__items__item" isSelected="false">${display}</p>`;
    }
  }
  selectedItemsDiv.style.display = selectedItemsDiv.children.length === 0 ? "none" : "block";

  const eventToSelectedItemTag = (e) => {
    selectItemTag(e.target, tag, sortedTagData, selectedItemsDiv, stateName);
  };

  const items = document.querySelectorAll(".menu__selects__select__items__item");
  items.forEach(item => item.addEventListener("click", eventToSelectedItemTag));
};

const selectItemTag = (item, tag, sortedTagData, selectedItemsDiv, stateName) => {
  const isSelected = item.getAttribute("isSelected");
  const selectedItems = state[stateName];

  if (isSelected === "false") {
    item.setAttribute("isSelected", "true");
    selectedItems.push(item.textContent);
  } else {
    item.setAttribute("isSelected", "false");
    selectedItems.splice(selectedItems.indexOf(item.textContent), 1);
  }

  displayTag(tag, sortedTagData, selectedItemsDiv, stateName);
};

export const updateTag = (tag, targetTagFunc, userSearch, selectedItemsDiv, stateName) => {
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
  displayTag(tag, tagData, selectedItemsDiv, stateName);
};

displayRecipes();