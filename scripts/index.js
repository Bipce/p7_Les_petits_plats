import { handleItemsSelection } from "./selects/tagListsClickEvent.js";
import { Recipe } from "./templates/Recipe.js";
import { recipes } from "../data/recipes.js";
import {
  appliancesTagDivList, appliancesTagListTitle, ingredientsTagDivList, ingredientsTagListTitle,
  recipesNbr, recipesSection, utensilsTagDivList, utensilsTagListTitle,
} from "./utils/constantes.js";

export const state = {
  currentRecipes: [...recipes],
  currentTagListId: "",
  selectedIngredients: [],
  selectedAppliances: [],
  selectedUtensils: [],
  lastUserSearch: "",
  searchedRecipes: [...recipes],
};

export const displayRecipes = () => {
  recipesSection.innerHTML = "";

  for (const recipe of state.currentRecipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }

  recipesNbr.innerHTML = `${state.currentRecipes.length} recettes`;
};

export const displayTagList = () => {
  const itemTagList = new Set();
  const tagListId = state.currentTagListId;
  const userSearch = state.lastUserSearch;
  let tagDivList;

  ingredientsTagDivList.innerHTML = "";
  appliancesTagDivList.innerHTML = "";
  utensilsTagDivList.innerHTML = "";

  for (const recipe of state.currentRecipes) {
    switch (tagListId) {
      case ingredientsTagListTitle :
        tagDivList = ingredientsTagDivList;
        for (const ingredient of recipe.ingredients) {
          const item = ingredient.ingredient.toLowerCase();
          addInSet(item, itemTagList, userSearch, state.selectedIngredients);
        }
        break;
      case appliancesTagListTitle:
        tagDivList = appliancesTagDivList;
        addInSet(recipe.appliance, itemTagList, userSearch, state.selectedAppliances);
        break;
      case utensilsTagListTitle:
        tagDivList = utensilsTagDivList;
        for (const utensil of recipe.utensils) {
          addInSet(utensil, itemTagList, userSearch, state.selectedUtensils);
        }
        break;
    }
  }

  const sortedDataTagList = [...itemTagList];
  sortedDataTagList.sort();

  for (const item of sortedDataTagList) {
    tagDivList.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
  }

  switch (tagListId) {
    case ingredientsTagListTitle:
      handleItemsSelection(ingredientsTagDivList, state.selectedIngredients);
      break;
    case appliancesTagListTitle:
      handleItemsSelection(appliancesTagDivList, state.selectedAppliances);
      break;
    case utensilsTagListTitle:
      handleItemsSelection(utensilsTagDivList, state.selectedUtensils);
  }
};

const addInSet = (item, setList, userSearch, selectedItems) => {
  const itemName = item.charAt(0).toUpperCase() + item.slice(1);

  if (!item.toLowerCase().includes(userSearch) || selectedItems.includes(itemName)) {
    return;
  }

  setList.add(itemName);
};

displayRecipes();