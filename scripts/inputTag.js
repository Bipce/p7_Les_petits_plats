import { displayAppliancesTag, displayIngredientsTag, displayUtensilsTag } from "./index.js";
import { recipes } from "../data/recipes.js";

const ingredientTag = document.getElementById("ingredients-tag");
const appliancesTag = document.getElementById("appliances-tag");
const utensilsTag = document.getElementById("utensils-tag");

const inputIngredientTag = document.getElementById("ingredients");
const inputAppliancesTag = document.getElementById("appliances");
const inputUtensilsTag = document.getElementById("utensils");

const setAttributes = (nameTag) => {
  const parentElement = nameTag.parentElement;

  if (parentElement.getAttribute("isOpen") === "false") {
    parentElement.setAttribute("isOpen", "true");
  } else {
    parentElement.setAttribute("isOpen", "false");
  }
};

const openTag = (nameTag) => {
  setAttributes(nameTag);
};

const addEventListenerToTag = (nameTag, displayFunc) => {
  nameTag.addEventListener("click", () => {
    openTag(nameTag);
    displayFunc(recipes, "");
  });
};

addEventListenerToTag(ingredientTag, displayIngredientsTag);
addEventListenerToTag(appliancesTag, displayAppliancesTag);
addEventListenerToTag(utensilsTag, displayUtensilsTag);

const addEventListenerInputTag = (inputTag, displayFunc) => {
  inputTag.addEventListener("input", (e) => displayFunc(recipes, e.target.value));
};

addEventListenerInputTag(inputIngredientTag, displayIngredientsTag);
addEventListenerInputTag(inputAppliancesTag, displayAppliancesTag);
addEventListenerInputTag(inputUtensilsTag, displayUtensilsTag);