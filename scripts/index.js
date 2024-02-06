import { handleItemsSelection } from "./selects/tagLists.js";
import { Recipe } from "./templates/Recipe.js";
import { recipes } from "../data/recipes.js";
import {
  appliancesTagDivList, ingredientsTagDivList, selectedAppliancesDiv,
  selectedIngredientsDiv, selectedUtensilsDiv, utensilsTagDivList,
} from "./utils/constantes.js";

const recipesSection = document.getElementById("recipes");
const recipesNbr = document.getElementById("recipesNumber");

export const state = {
  filteredRecipes: [...recipes],
  currentTagListId: "",
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

export const displayTagList = (userSearch) => {
  const itemTagList = new Set();
  const tagListId = state.currentTagListId;

  ingredientsTagDivList.innerHTML = "";
  appliancesTagDivList.innerHTML = "";
  utensilsTagDivList.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    if (tagListId === "ingredientsTagListTitle") {
      for (const ingredient of recipe.ingredients) {
        const item = ingredient.ingredient.toLowerCase();
        addInHTML(ingredientsTagDivList, item, itemTagList, userSearch, state.selectedIngredients);
      }

    } else if (tagListId === "appliancesTagListTitle") {
      addInHTML(appliancesTagDivList, recipe.appliance, itemTagList, userSearch, state.selectedAppliances);

    } else if (tagListId === "utensilsTagListTitle") {
      for (const utensil of recipe.utensils) {
        addInHTML(utensilsTagDivList, utensil, itemTagList, userSearch, state.selectedUtensils);
      }
    }
  }

  if (tagListId === "ingredientsTagListTitle") {
    handleItemsSelection(ingredientsTagDivList, state.selectedIngredients, selectedIngredientsDiv);

  } else if (tagListId === "appliancesTagListTitle") {
    handleItemsSelection(appliancesTagDivList, state.selectedAppliances, selectedAppliancesDiv);

  } else if (tagListId === "utensilsTagListTitle") {
    handleItemsSelection(utensilsTagDivList, state.selectedUtensils, selectedUtensilsDiv);
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
