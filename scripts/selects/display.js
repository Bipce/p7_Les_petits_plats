import { displayRecipes, displayTagList, state } from "../index.js";
import {
  appliancesTagListTitle, ingredientsTagListTitle, selectedAppliancesDiv,
  selectedIngredientsDiv, selectedUtensilsDiv, utensilsTagListTitle,
} from "../utils/constantes.js";

export const displaySelectedTagList = () => {
  let selectedDiv;
  let currentState;

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

  for (const item of currentState) {
    selectedDiv.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
  }

  selectedDiv.style.display = selectedDiv.children.length > 0 ? "block" : "none";
  selectedDiv.nextElementSibling.style.maxHeight = selectedDiv.children.length > 0 ? "80px" : "185px";

  displaySelectedItemInMenuDiv();
};

export const displaySelectedItemInMenuDiv = () => {
  const selectedItemsDiv = document.getElementById("menuSelectedItemDiv");

  selectedItemsDiv.innerHTML = "";

  const addInDivHTML = (item, type) => {

    selectedItemsDiv.innerHTML += `<div class="menu__selectedItems__item" type="${type}">
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


  for (const element of selectedItemsDiv.children) {
    element.addEventListener("click", () => {
      const elementName = element.firstElementChild.textContent;
      const elementType = element.getAttribute("type");
      const elementState = state[elementType];
      const elementIndex = elementState.indexOf(elementName);

      elementState.splice(elementIndex, 1);
      displaySelectedTagList();
      updateRecipesPerSelectedItems();
      displayTagList();
    });
  }
};

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