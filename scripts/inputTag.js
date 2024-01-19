import { displayIngredientsTag } from "./index.js";
import { recipes } from "../data/recipes.js";

const ingredientTag = document.getElementById("ingredients-tag");

const openTag = () => {
  if (ingredientTag.getAttribute("isOpen") === "false") {
    ingredientTag.setAttribute("isOpen", "true");
  } else {
    ingredientTag.setAttribute("isOpen", "false");
  }
};

ingredientTag.addEventListener("click", () => {
  openTag();
  displayIngredientsTag(recipes);
});