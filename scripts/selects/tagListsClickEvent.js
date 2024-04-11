import { displayTagList, state } from "../index.js";
import { onClearInput, onInputChange } from "./input.js";
import { displaySelectedTagList, updateRecipesPerSelectedItems } from "./display.js";

const tagListsTitle = document.querySelectorAll(".menu__selects__select__title");

/**
 * Open or close the tag lists when clicked
 * @param {MouseEvent} e
 */
const onTagListsClick = (e) => {
  tagListsTitle.forEach(x => {
    if (x.parentElement.getAttribute("data-isOpen") === "true") {
      x.nextElementSibling.nextElementSibling.style.display = "none";
    }

    if (x.parentElement !== e.target.parentElement) {
      x.parentElement.setAttribute("data-isOpen", "false");
    }
  });

  const dataIsOpen = e.target.parentElement.getAttribute("data-isOpen");
  e.target.parentElement.setAttribute("data-isOpen", (dataIsOpen === "false").toString());

  const inputElement = e.target.nextElementSibling.children[1];

  state.tagListUserSearch = "";

  if (dataIsOpen === "false") {
    state.currentTagListId = e.target.id;
    inputElement.value = "";
    inputElement.nextElementSibling.style.display = "none"; // Hide cross
    inputElement.addEventListener("input", onInputChange);
    inputElement.nextElementSibling.addEventListener("click", onClearInput); // Add event on cross
    displayTagList();
    displaySelectedTagList();
  }
};

tagListsTitle.forEach(tagListTitle => {
  tagListTitle.addEventListener("click", onTagListsClick);
});

/**
 * Handle the selection of the item in the list
 * Update the recipes when item is selected and deselected, display the selected tag list and the tag list
 * @param {Element} tagDivList
 * @param {[]} currentState
 */
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