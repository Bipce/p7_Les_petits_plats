import { displayAppliancesTag, displayIngredientsTag, displayUtensilsTag } from "./index.js";
import { recipes } from "../data/recipes.js";

const ingredientTag = document.getElementById("ingredients-tag");
const appliancesTag = document.getElementById("appliances-tag");
const utensilsTag = document.getElementById("utensils-tag");

const setAttributes = (nameTag) => {
  if (nameTag.getAttribute("isOpen") === "false") {
    nameTag.setAttribute("isOpen", "true");
  } else {
    nameTag.setAttribute("isOpen", "false");
  }
};

const openTag = (nameTag) => {
  setAttributes(nameTag);
};

const addEventListenerToTag = (nameTag, displayFunc) => {
  nameTag.addEventListener("click", () => {
    openTag(nameTag);
    displayFunc(recipes);
  });
};

addEventListenerToTag(ingredientTag, displayIngredientsTag);
addEventListenerToTag(appliancesTag, displayAppliancesTag);
addEventListenerToTag(utensilsTag, displayUtensilsTag);