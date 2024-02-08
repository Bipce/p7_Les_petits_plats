import { handleItemsSelection } from "./selects/tagLists.js";
import { Recipe } from "./templates/Recipe.js";
import { recipes } from "../data/recipes.js";
import {
  appliancesTagDivList, appliancesTagListTitle, ingredientsTagDivList, ingredientsTagListTitle,
  recipesNbr, recipesSection, utensilsTagDivList, utensilsTagListTitle,
} from "./utils/constantes.js";


export const state = {
  filteredRecipes: [...recipes],
  currentTagListId: "",
  selectedIngredients: [],
  selectedAppliances: [],
  selectedUtensils: [],
  lastUserSearch: "",
  searchedRecipes: [...recipes],
};

export const displayRecipes = () => {
  recipesSection.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }

  recipesNbr.innerHTML = `${state.filteredRecipes.length} recettes`;
};

export const displayTagList = () => {
  const itemTagList = new Set();
  const tagListId = state.currentTagListId;
  const userSearch = state.lastUserSearch;

  ingredientsTagDivList.innerHTML = "";
  appliancesTagDivList.innerHTML = "";
  utensilsTagDivList.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    if (tagListId === ingredientsTagListTitle) {
      for (const ingredient of recipe.ingredients) {
        const item = ingredient.ingredient.toLowerCase();
        addInHTML(ingredientsTagDivList, item, itemTagList, userSearch, state.selectedIngredients);
      }
    } else if (tagListId === appliancesTagListTitle) {
      addInHTML(appliancesTagDivList, recipe.appliance, itemTagList, userSearch, state.selectedAppliances);
    } else if (tagListId === utensilsTagListTitle) {
      for (const utensil of recipe.utensils) {
        addInHTML(utensilsTagDivList, utensil, itemTagList, userSearch, state.selectedUtensils);
      }
    }
  }

  if (tagListId === ingredientsTagListTitle) {
    handleItemsSelection(ingredientsTagDivList, state.selectedIngredients);
  } else if (tagListId === appliancesTagListTitle) {
    handleItemsSelection(appliancesTagDivList, state.selectedAppliances);
  } else if (tagListId === utensilsTagListTitle) {
    handleItemsSelection(utensilsTagDivList, state.selectedUtensils);
  }
};

const addInHTML = (tagDivList, item, setList, userSearch, selectedItems) => {
  const itemName = item.charAt(0).toUpperCase() + item.slice(1);

  if (!item.toLowerCase().includes(userSearch)) {
    return;
  }

  if (selectedItems.includes(itemName)) {
    return;
  }

  if (!setList.has(item)) {
    tagDivList.innerHTML += `<p class="menu__selects__select__items__item">${itemName}</p>`;
    setList.add(item);
  }
};

displayRecipes();