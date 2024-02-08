import { displayRecipes, displayTagList, state } from "../index.js";
import {
  selectedIngredientsDiv, selectedAppliancesDiv, selectedUtensilsDiv,
  ingredientsTagListTitle, appliancesTagListTitle, utensilsTagListTitle,
} from "../utils/constantes.js";

const tagListsTitle = document.querySelectorAll(".menu__selects__select__title");

const onTagListsClick = (e) => {
  tagListsTitle.forEach(x => {
    if (x.parentElement.getAttribute("isOpen") === "true") {
      x.nextElementSibling.nextElementSibling.style.display = "none";
    }

    if (x.parentElement !== e.target.parentElement) {
      x.parentElement.setAttribute("isOpen", "false");
    }
  });

  const isOpen = e.target.parentElement.getAttribute("isOpen");
  e.target.parentElement.setAttribute("isOpen", (isOpen === "false").toString());
  const inputElement = e.target.nextElementSibling.children[1];

  state.lastUserSearch = "";

  if (isOpen === "false") {
    state.currentTagListId = e.target.id;
    inputElement.value = "";
    inputElement.nextElementSibling.style.display = "none"; // Hide cross
    inputElement.addEventListener("input", onInputChange);
    inputElement.nextElementSibling.addEventListener("click", onClearInput); // Add event on cross
    displayTagList();
    displaySelectedTagList();

  } else {
    inputElement.removeEventListener("input", onInputChange);
    inputElement.nextElementSibling.removeEventListener("click", onClearInput); // Remove cross event
  }
};

tagListsTitle.forEach(tagListTitle => {
  tagListTitle.addEventListener("click", onTagListsClick);
});

const onInputChange = (e) => {
  e.target.nextElementSibling.style.display = e.target.value.length > 0 ? "block" : "none"; // Hide or Show cross
  state.lastUserSearch = e.target.value;
  displayTagList();
};

const onClearInput = (e) => {
  e.target.previousElementSibling.value = ""; // Clear input element
  e.target.style.display = "none"; // Hide cross
  state.lastUserSearch = "";
  displayTagList();
};

const displaySelectedTagList = () => {
  let selectedDiv;
  let currentState;

  if (state.currentTagListId === ingredientsTagListTitle) {
    currentState = state.selectedIngredients;
    selectedDiv = selectedIngredientsDiv;
  } else if (state.currentTagListId === appliancesTagListTitle) {
    currentState = state.selectedAppliances;
    selectedDiv = selectedAppliancesDiv;
  } else if (state.currentTagListId === utensilsTagListTitle) {
    currentState = state.selectedUtensils;
    selectedDiv = selectedUtensilsDiv;
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

export const handleItemsSelection = (tagDivList, currentState) => {
  for (const item of tagDivList.children) {
    item.addEventListener("click", () => {
      currentState.push(item.textContent);
      updateRecipesPerSelectedItems();
      displaySelectedTagList();
      displayTagList();
    });
  }
};

const updateRecipesPerSelectedItems = () => {
  state.filteredRecipes = [];

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

    state.filteredRecipes.push(recipe);
  }

  displayRecipes();
};