// import { updateTag } from "./index.js";
import { displayTagList, state } from "../index.js";

const tagListsTitle = document.querySelectorAll(".menu__selects__select__title");

const onTagListsClick = (e) => {
  tagListsTitle.forEach(x => {
    if (x.parentElement !== e.target.parentElement) {
      x.parentElement.setAttribute("isOpen", "false");
    }
  });

  const isOpen = e.target.parentElement.getAttribute("isOpen");
  e.target.parentElement.setAttribute("isOpen", (isOpen === "false").toString());

  const inputElement = e.target.nextElementSibling.children[1];

  if (isOpen === "false") {
    state.currentTagListId = e.target.id;
    inputElement.value = "";
    inputElement.nextElementSibling.style.display = "none"; // Hide cross
    inputElement.addEventListener("input", onInputChange);
    inputElement.nextElementSibling.addEventListener("click", onClearInput); // Add event on cross
    displayTagList("");
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
  displayTagList(e.target.value);
};

const onClearInput = (e) => {
  e.target.previousElementSibling.value = ""; // Clear input element
  e.target.style.display = "none"; // Hide cross
  displayTagList("");
};

// ingredientsTagListTitleTitle.addEventListener("click", () => {
//   ingredientsTagListTitleTitle.parentElement.setAttribute("isOpen", "true");
// });

//
// const ingredientTagDiv = document.getElementById("ingredientsTagDiv");
// const appliancesTagDiv = document.getElementById("appliancesTagDiv");
// const utensilsTagDiv = document.getElementById("utensilsTagDiv");
//
// const inputIngredientTag = document.getElementById("ingredientsInput");
// const inputAppliancesTag = document.getElementById("appliancesInput");
// const inputUtensilsTag = document.getElementById("utensilsInput");
//
// const clearIconIngredientsSearch = document.getElementById("clearUserIngredientsSearch");
// const clearIconAppliancesSearch = document.getElementById("clearUserAppliancesSearch");
// const clearIconUtensilsSearch = document.getElementById("clearUserUtensilsSearch");
//
// export const selectIngredientsDiv = document.getElementById("selectIngredients");
// export const selectAppliancesDiv = document.getElementById("selectAppliances");
// export const selectUtensilsDiv = document.getElementById("selectUtensils");
//
// const setAttributes = (nameTag) => {
//   const parentElement = nameTag.parentElement;
//   const state = parentElement.getAttribute("isOpen");
//
//   parentElement.setAttribute("isOpen", (state === "false").toString());
// };
//
// const addEventListenerToTag = (nameTag, tag, targetFunc, selectedItemsDiv, stateName) => {
//   nameTag.addEventListener("click", () => {
//     setAttributes(nameTag);
//     updateTag(tag, targetFunc, "", selectedItemsDiv, stateName);
//   });
// };
//
// export const ingredientsFunc = (recipe) => {
//   const ingredientsArr = [];
//
//   for (const item of recipe.ingredients) {
//     ingredientsArr.push(item.ingredient);
//   }
//   return ingredientsArr;
// };
//
// export const appliancesFunc = (recipe) => [recipe.appliance];
//
// export const utensilsFunc = (recipe) => {
//   const utensilsArr = [];
//
//   for (let item of recipe.utensils) {
//     item = item.charAt(0).toUpperCase() + item.slice(1);
//     utensilsArr.push(item);
//   }
//   return utensilsArr;
// };
//
// addEventListenerToTag(ingredientTag, ingredientTagDiv, ingredientsFunc, selectIngredientsDiv, "selectedIngredients");
// addEventListenerToTag(appliancesTag, appliancesTagDiv, appliancesFunc, selectAppliancesDiv, "selectedAppliances");
// addEventListenerToTag(utensilsTag, utensilsTagDiv, utensilsFunc, selectUtensilsDiv, "selectedUtensils");
//
// const stateClearIcon = (inputTag, clearIcon) => {
//   const state = inputTag.value.length > 0;
//   clearIcon.setAttribute("isClicked", state);
// };
//
// const addEventListenerInputTag = (inputTag, tag, targetTagFunc, clearIcon, selectedItemsDiv, stateName) => {
//   inputTag.addEventListener("input", (e) => {
//     updateTag(tag, targetTagFunc, e.target.value, selectedItemsDiv, stateName);
//     stateClearIcon(inputTag, clearIcon);
//   });
//
//   clearIcon.addEventListener("click", () => {
//     inputTag.value = "";
//     updateTag(tag, targetTagFunc, inputTag.value, selectedItemsDiv, stateName);
//     stateClearIcon(inputTag, clearIcon);
//   });
// };
//
// addEventListenerInputTag(inputIngredientTag, ingredientTagDiv, ingredientsFunc, clearIconIngredientsSearch,
//   selectIngredientsDiv, "selectedIngredients");
// addEventListenerInputTag(inputAppliancesTag, appliancesTagDiv, appliancesFunc, clearIconAppliancesSearch,
//   selectAppliancesDiv, "selectedAppliances");
// addEventListenerInputTag(inputUtensilsTag, utensilsTagDiv, utensilsFunc, clearIconUtensilsSearch, selectUtensilsDiv,
//   "selectedUtensils");