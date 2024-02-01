import { updateTag } from "./index.js";

const ingredientTag = document.getElementById("ingredientsTagTitle");
const appliancesTag = document.getElementById("appliancesTagTitle");
const utensilsTag = document.getElementById("utensilsTagTitle");

const ingredientTagDiv = document.getElementById("ingredientsTagDiv");
const appliancesTagDiv = document.getElementById("appliancesTagDiv");
const utensilsTagDiv = document.getElementById("utensilsTagDiv");

const inputIngredientTag = document.getElementById("ingredientsInput");
const inputAppliancesTag = document.getElementById("appliancesInput");
const inputUtensilsTag = document.getElementById("utensilsInput");

const clearIconIngredientsSearch = document.getElementById("clearUserIngredientsSearch");
const clearIconAppliancesSearch = document.getElementById("clearUserAppliancesSearch");
const clearIconUtensilsSearch = document.getElementById("clearUserUtensilsSearch");

export const selectIngredientsDiv = document.getElementById("selectIngredients");
export const selectAppliancesDiv = document.getElementById("selectAppliances");
export const selectUtensilsDiv = document.getElementById("selectUtensils");

const setAttributes = (nameTag) => {
  const parentElement = nameTag.parentElement;
  const state = parentElement.getAttribute("isOpen");
  parentElement.setAttribute("isOpen", (state === "false").toString());
};

const addEventListenerToTag = (nameTag, tag, targetFunc, selectedItemsDiv, stateName) => {
  nameTag.addEventListener("click", () => {
    setAttributes(nameTag);
    updateTag(tag, targetFunc, "", selectedItemsDiv, stateName);
  });
};

export const ingredientsFunc = (recipe) => {
  const ingredientsArr = [];

  for (const item of recipe.ingredients) {
    ingredientsArr.push(item.ingredient);
  }
  return ingredientsArr;
};

export const appliancesFunc = (recipe) => [recipe.appliance];

export const utensilsFunc = (recipe) => {
  const utensilsArr = [];

  for (let item of recipe.utensils) {
    item = item.charAt(0).toUpperCase() + item.slice(1);
    utensilsArr.push(item);
  }
  return utensilsArr;
};

addEventListenerToTag(ingredientTag, ingredientTagDiv, ingredientsFunc, selectIngredientsDiv, "selectedIngredients");
addEventListenerToTag(appliancesTag, appliancesTagDiv, appliancesFunc, selectAppliancesDiv, "selectedAppliances");
addEventListenerToTag(utensilsTag, utensilsTagDiv, utensilsFunc, selectUtensilsDiv, "selectedUtensils");

const stateClearIcon = (inputTag, clearIcon) => {
  const state = inputTag.value.length > 0;
  clearIcon.setAttribute("isClicked", state);
};

const addEventListenerInputTag = (inputTag, tag, targetTagFunc, clearIcon, selectedItemsDiv, stateName) => {
  inputTag.addEventListener("input", (e) => {
    updateTag(tag, targetTagFunc, e.target.value, selectedItemsDiv, stateName);
    stateClearIcon(inputTag, clearIcon);
  });
  clearIcon.addEventListener("click", () => {
    inputTag.value = "";
    updateTag(tag, targetTagFunc, inputTag.value, selectedItemsDiv, stateName);
    stateClearIcon(inputTag, clearIcon);
  });
};

addEventListenerInputTag(inputIngredientTag, ingredientTagDiv, ingredientsFunc, clearIconIngredientsSearch,
  selectIngredientsDiv, "selectedIngredients");
addEventListenerInputTag(inputAppliancesTag, appliancesTagDiv, appliancesFunc, clearIconAppliancesSearch,
  selectAppliancesDiv, "selectedAppliances");
addEventListenerInputTag(inputUtensilsTag, utensilsTagDiv, utensilsFunc, clearIconUtensilsSearch, selectUtensilsDiv,
  "selectedUtensils");