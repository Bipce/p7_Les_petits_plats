import { Recipe } from "./templates/Recipe.js";
import { recipes } from "../data/recipes.js";
// import { appliancesFunc, ingredientsFunc, utensilsFunc } from "./tags.js";

const recipesSection = document.getElementById("recipes");
const recipesNbr = document.getElementById("recipesNumber");
const ingredientsTagDivList = document.getElementById("ingredientsTagDiv");
const appliancesTagDivList = document.getElementById("appliancesTagDiv");
const utensilsTagDivList = document.getElementById("utensilsTagDiv");

export const state = {
  filteredRecipes: [...recipes],
  currentTagListId: "",
};

export const displayRecipes = () => {
  recipesSection.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    const recipeModel = new Recipe(recipe);
    recipesSection.innerHTML += recipeModel.getRecipesDOMPage();
  }

  recipesNbr.innerHTML = `${state.filteredRecipes.length} recettes`;
};

export const displayTagList = (userSearch) => {
  const itemTagList = new Set();
  const tagListId = state.currentTagListId;

  ingredientsTagDivList.innerHTML = "";
  appliancesTagDivList.innerHTML = "";
  utensilsTagDivList.innerHTML = "";

  for (const recipe of state.filteredRecipes) {
    if (tagListId === "ingredientsTagListTitle") {
      for (const ingredient of recipe.ingredients) {
        const item = ingredient.ingredient.toLowerCase();
        addInHTML(ingredientsTagDivList, "ingredient", item, itemTagList, userSearch);
      }

    } else if (tagListId === "appliancesTagListTitle") {
      addInHTML(appliancesTagDivList, "appliance", recipe.appliance, itemTagList, userSearch);

    } else if (tagListId === "utensilsTagListTitle") {
      for (const utensil of recipe.utensils) {
        addInHTML(utensilsTagDivList, "utensil", utensil, itemTagList, userSearch);
      }
    }
  }
};

const addInHTML = (tagDivList, type, item, setList, userSearch) => {
  const itemName = item.charAt(0).toUpperCase() + item.slice(1);

  if (!item.toLowerCase().includes(userSearch)) {
    return;
  }

  if (!setList.has(item)) {
    tagDivList.innerHTML += `<p class="menu__selects__select__items__item">${itemName}</p>`;
    setList.add(item);
  }
};

// export const displayTag = (tag, tagData, selectedItemsDiv, stateName) => {
//   const sortedTagData = [...tagData];
//
//   tag.innerHTML = "";
//   selectedItemsDiv.innerHTML = "";
//
//   sortedTagData.sort();
//
//   for (const item of sortedTagData) {
//     const display = item.charAt(0).toUpperCase() + item.slice(1);
//     if (state[stateName].includes(display)) {
//       selectedItemsDiv.innerHTML += `<p class="menu__selects__select__items__item" isSelected="true">${display}</p>`;
//     } else {
//       tag.innerHTML += `<p class="menu__selects__select__items__item" isSelected="false">${display}</p>`;
//     }
//   }
//
//   selectedItemsDiv.style.display = selectedItemsDiv.children.length === 0 ? "none" : "block";
//
//   if (tag.parentElement.getAttribute("isOpen") === "true" && selectedItemsDiv.children.length > 0) {
//     selectedItemsDiv.style.display = "block";
//   } else {
//     selectedItemsDiv.style.display = "none";
//   }
//
//   const eventToSelectedItemTag = (e) => {
//     selectItemTag(e.target, tag, sortedTagData, selectedItemsDiv, stateName);
//   };
//
//   const items = document.querySelectorAll(".menu__selects__select__items__item");
//   items.forEach(item => item.addEventListener("click", eventToSelectedItemTag));
// };
//
// const selectItemTag = (item, tag, sortedTagData, selectedItemsDiv, stateName) => {
//   const isSelected = item.getAttribute("isSelected");
//   const selectedItems = state[stateName];
//
//   if (isSelected === "false") {
//     item.setAttribute("isSelected", "true");
//     selectedItems.push(item.textContent);
//   } else {
//     item.setAttribute("isSelected", "false");
//     selectedItems.splice(selectedItems.indexOf(item.textContent), 1);
//   }
//
//   updateRecipesWithTag();
//   displayTag(tag, sortedTagData, selectedItemsDiv, stateName);
//   // displaySelectedItemsDiv(tag, sortedTagData, selectedItemsDiv, stateName);
//   displaySelectedItemsDiv(item, stateName);
// };
//
// const updateRecipesWithTag = () => {
//   let canAddRecipe = true;
//   state.filteredRecipes = [];
//
//   for (const recipe of state.searchedRecipes) {
//     canAddRecipe = true;
//
//     const ingredients = ingredientsFunc(recipe);
//     for (const selectedIngredient of state.selectedIngredients) {
//       if (!ingredients.includes(selectedIngredient)) {
//         canAddRecipe = false;
//         break;
//       }
//     }
//
//     const appliances = appliancesFunc(recipe);
//     for (const selectedAppliance of state.selectedAppliances) {
//       if (!appliances.includes(selectedAppliance)) {
//         canAddRecipe = false;
//         break;
//       }
//     }
//
//     const utensils = utensilsFunc(recipe);
//     for (const selectedUtensil of state.selectedUtensils) {
//       if (!utensils.includes(selectedUtensil)) {
//         canAddRecipe = false;
//         break;
//       }
//     }
//
//     if (canAddRecipe) {
//       state.filteredRecipes.push(recipe);
//     }
//   }
//   displayRecipes();
// };
//
// export const updateTag = (tag, targetTagFunc, userSearch, selectedItemsDiv, stateName) => {
//   const tagData = new Set();
//
//   for (const recipe of state.filteredRecipes) {
//     const tagsArray = targetTagFunc(recipe);
//     for (const item of tagsArray) {
//       const itemLowerCase = item.toLowerCase();
//       if (itemLowerCase.includes(userSearch)) {
//         tagData.add(itemLowerCase);
//       }
//     }
//   }
//   displayTag(tag, tagData, selectedItemsDiv, stateName);
// };
//
// // const displaySelectedItemsDiv = (tag, sortedTagData, selectedItemsDiv, stateName) => {
// const div = document.getElementById("menuSelectedItemDiv");
// const displaySelectedItemsDiv = (item, stateName) => {
//   const itemContent = `<div class="menu__selectedItems__item">
//                           <p>${item.textContent}</p>
//                           <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
//                         </div>`;
//
//   // div.innerHTML = "";
//
//   // div.innerHTML += `<span class="menu__selectedItems__item">
//   //                       <p>${item.textContent}</p>
//   //                       <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
//   //                     </span>`;
//
//   div.insertAdjacentHTML("beforeend", itemContent);
//
//   // const element = div.querySelectorAll(".menu__selectedItems__item");
//   div.lastElementChild.addEventListener("click", (e) => {
//     console.log(e.target);
//     console.log(stateName);
//   });
//
//   // for (const selectedIngredient of state.selectedIngredients) {
//   //   div.innerHTML += `<span class="menu__selectedItems__item">
//   //                       <p>${selectedIngredient}</p>
//   //                       <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
//   //                     </span>`;
//   //
//   // }
//   //
//   // for (const selectedAppliance of state.selectedAppliances) {
//   //   div.innerHTML += `<span class="menu__selectedItems__item">
//   //                       <p>${selectedAppliance}</p>
//   //                       <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
//   //                     </span>`;
//   // }
//   //
//   // for (const selectedUtensil of state.selectedUtensils) {
//   //   div.innerHTML += `<span class="menu__selectedItems__item">
//   //                       <p>${selectedUtensil}</p>
//   //                       <i class="fa-solid fa-xmark menu__selectedItems__icon"></i>
//   //                     </span>`;
//   // }
//
//   // const selectedElements = document.querySelectorAll(".menu__selectedItems__item");
//   // selectedElements.forEach(selectedElement => selectedElement.addEventListener("click", () => {
//   //   state.selectedIngredients.splice(state.selectedIngredients.indexOf(selectedElement.children[0].textContent), 1);
//   //   state.selectedAppliances.splice(state.selectedAppliances.indexOf(selectedElement.children[0].textContent), 1);
//   //   state.selectedUtensils.splice(state.selectedUtensils.indexOf(selectedElement.children[0].textContent), 1);
//   //
//   //   // const test = state[stateName];
//   //   // test.splice(test.indexOf(selectedElement.children[0].textContent), 1);
//   //
//   //   updateRecipesWithTag();
//   //   displayTag(tag, sortedTagData, selectedItemsDiv, stateName);
//   //   displaySelectedItemsDiv(tag, sortedTagData, selectedItemsDiv, stateName);
//   // }));
// };

displayRecipes();
