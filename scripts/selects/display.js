import { displayRecipes, displayTagList, state } from "../index.js";
import {
  appliancesTagListTitle, ingredientsTagListTitle, selectedAppliancesDiv,
  selectedIngredientsDiv, selectedUtensilsDiv, utensilsTagListTitle,
} from "../utils/constantes.js";

/**
 * Display the selected tag list when an item has been selected
 */
export const displaySelectedTagList = () => {
  let selectedDiv;
  let currentState;

  // First set currentState and the selectedDiv to the right ones
  switch (state.currentTagListId) {
    case ingredientsTagListTitle:
      currentState = state.selectedIngredients;
      selectedDiv = selectedIngredientsDiv;
      break;
    case appliancesTagListTitle:
      currentState = state.selectedAppliances;
      selectedDiv = selectedAppliancesDiv;
      break;
    case utensilsTagListTitle:
      currentState = state.selectedUtensils;
      selectedDiv = selectedUtensilsDiv;
      break;
  }

  selectedDiv.innerHTML = ""; // Clear HTML to avoid double

  // Second add item in HTML
  for (const item of currentState) {
    selectedDiv.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
  }

  selectedDiv.style.display = selectedDiv.children.length === 0 ||
  selectedDiv.parentElement.getAttribute("data-IsOpen") === "false" ? "none" : "block";
  selectedDiv.nextElementSibling.style.maxHeight = selectedDiv.children.length > 0 ? "80px" : "185px";

  displaySelectedItemInMenuDiv();
};

/**
 * Display selected items in Div below the lists
 */
export const displaySelectedItemInMenuDiv = () => {
  const selectedItemsDiv = document.getElementById("menuSelectedItemDiv");

  selectedItemsDiv.innerHTML = "";

  /**
   * Add item in HTML
   * @param {string} item
   * @param {string} type
   */
  const addInDivHTML = (item, type) => {
    selectedItemsDiv.innerHTML += `<div class="menu__selectedItems__item" data-type="${type}">
                                     <p>${item}</p>
                                     <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
                                   </div>`;

  };

  for (const ingredient of state.selectedIngredients) {
    addInDivHTML(ingredient, "selectedIngredients");
  }

  for (const appliance of state.selectedAppliances) {
    addInDivHTML(appliance, "selectedAppliances");
  }

  for (const utensil of state.selectedUtensils) {
    addInDivHTML(utensil, "selectedUtensils");
  }

  // Display tag list and update recipes when item is deleted
  for (const element of selectedItemsDiv.children) {
    element.addEventListener("click", () => {
      const elementName = element.firstElementChild.textContent;
      const elementType = element.getAttribute("data-type");
      const elementState = state[elementType];
      const elementIndex = elementState.indexOf(elementName);

      elementState.splice(elementIndex, 1);
      displaySelectedTagList();
      updateRecipesPerSelectedItems();
      displayTagList();
    });
  }
};

/**
 * Update recipes when select item
 */
export const updateRecipesPerSelectedItems = () => {
  state.currentRecipes = [];

  let addRecipe = true;

  for (const recipe of state.searchedRecipes) {
    addRecipe = true;

    const ingredients = recipe.ingredients.map(x => x.ingredient.toLowerCase());
    for (const selectedIngredient of state.selectedIngredients) {
      if (!ingredients.includes(selectedIngredient.toLowerCase())) {
        addRecipe = false;
        break;
      }
    }

    if (addRecipe) {
      for (const selectedAppliance of state.selectedAppliances) {
        if (selectedAppliance.toLowerCase() !== recipe.appliance.toLowerCase()) {
          addRecipe = false;
          break;
        }
      }
    }

    if (addRecipe) {
      const utensils = recipe.utensils.map(x => x.toLowerCase());
      for (const selectedUtensil of state.selectedUtensils) {
        if (!utensils.includes(selectedUtensil.toLowerCase())) {
          addRecipe = false;
          break;
        }
      }
    }

    if (!addRecipe) {
      continue;
    }

    state.currentRecipes.push(recipe);
  }

  displayRecipes();
};