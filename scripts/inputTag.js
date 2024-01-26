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


const setAttributes = (nameTag) => {
  const parentElement = nameTag.parentElement;

  if (parentElement.getAttribute("isOpen") === "false") {
    parentElement.setAttribute("isOpen", "true");
  } else {
    parentElement.setAttribute("isOpen", "false");
  }
};

const addEventListenerToTag = (nameTag, tag, targetFunc) => {
  nameTag.addEventListener("click", () => {
    setAttributes(nameTag);
    updateTag(tag, targetFunc, "");
  });
};

const ingredientsFunc = (recipe) => {
  const ingredientsArr = [];

  for (const item of recipe.ingredients) {
    ingredientsArr.push(item.ingredient);
  }
  return ingredientsArr;
};

const appliancesFunc = (recipe) => [recipe.appliance];

const utensilsFunc = (recipe) => {
  const utensilsArr = [];

  for (const item of recipe.utensils) {
    utensilsArr.push(item);
  }
  return utensilsArr;
};

addEventListenerToTag(ingredientTag, ingredientTagDiv, ingredientsFunc);
addEventListenerToTag(appliancesTag, appliancesTagDiv, appliancesFunc);
addEventListenerToTag(utensilsTag, utensilsTagDiv, utensilsFunc);

const stateClearIcon = (inputTag, clearIcon) => {
  const state = inputTag.value.length > 0;
  clearIcon.setAttribute("isClicked", state);
};

const addEventListenerInputTag = (inputTag, tag, targetTagFunc, clearIcon) => {
  inputTag.addEventListener("input", (e) => {
    updateTag(tag, targetTagFunc, e.target.value);
    stateClearIcon(inputTag, clearIcon);
  });

  clearIcon.addEventListener("click", () => {
    inputTag.value = "";
    updateTag(tag, targetTagFunc, inputTag.value);
    stateClearIcon(inputTag, clearIcon);
  });
};

addEventListenerInputTag(inputIngredientTag, ingredientTagDiv, ingredientsFunc, clearIconIngredientsSearch);
addEventListenerInputTag(inputAppliancesTag, appliancesTagDiv, appliancesFunc, clearIconAppliancesSearch);
addEventListenerInputTag(inputUtensilsTag, utensilsTagDiv, utensilsFunc, clearIconUtensilsSearch);