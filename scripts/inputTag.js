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

const setAttributes = (nameTag) => {
  const parentElement = nameTag.parentElement;

  if (parentElement.getAttribute("isOpen") === "false") {
    parentElement.setAttribute("isOpen", "true");
  } else {
    parentElement.setAttribute("isOpen", "false");
  }
};

const addEventListenerToTag = (openTag, tag, targetFunc) => {
  openTag.addEventListener("click", () => {
    setAttributes(openTag);
    updateTag(tag, targetFunc, "");
  });
};

const ingredientsFunc = (recipe) => {
  const target = [];
  
  for (const item of recipe.ingredients) {
    target.push(item.ingredient);
  }
  return target;
};

const appliancesFunc = (recipe) => [recipe.appliance];

const utensilsFunc = (recipe) => {
  const target = [];

  for (const item of recipe.utensils) {
    target.push(item);
  }
  return target;
};

addEventListenerToTag(ingredientTag, ingredientTagDiv, ingredientsFunc);
addEventListenerToTag(appliancesTag, appliancesTagDiv, appliancesFunc);
addEventListenerToTag(utensilsTag, utensilsTagDiv, utensilsFunc);

const addEventListenerInputTag = (inputTag, tag, targetFunc) => {
  inputTag.addEventListener("input", (e) => {
    updateTag(tag, targetFunc, e.target.value);
  });
};

addEventListenerInputTag(inputIngredientTag, ingredientTagDiv, ingredientsFunc);
addEventListenerInputTag(inputAppliancesTag, appliancesTagDiv, appliancesFunc);
addEventListenerInputTag(inputUtensilsTag, utensilsTagDiv, utensilsFunc);