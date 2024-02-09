import { displayTagList, state } from "../index.js";
import { onClearInput, onInputChange } from "./input.js";
import { displaySelectedTagList, updateRecipesPerSelectedItems } from "./display.js";

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
  }
};

tagListsTitle.forEach(tagListTitle => {
  tagListTitle.addEventListener("click", onTagListsClick);
});

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