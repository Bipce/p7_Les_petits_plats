import { displayTagList, state } from "../index.js";
import { selectedIngredientsDiv, selectedAppliancesDiv, selectedUtensilsDiv } from "../utils/constantes.js";

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

  if (isOpen === "false") {
    state.currentTagListId = e.target.id;
    inputElement.value = "";
    inputElement.nextElementSibling.style.display = "none"; // Hide cross
    inputElement.addEventListener("input", onInputChange);
    inputElement.nextElementSibling.addEventListener("click", onClearInput); // Add event on cross
    displayTagList("");

    if (state.currentTagListId === "ingredientsTagListTitle") {
      displaySelectedTagList(selectedIngredientsDiv, state.selectedIngredients, "ingredientsTagListTitle");

    } else if (state.currentTagListId === "appliancesTagListTitle") {
      displaySelectedTagList(selectedAppliancesDiv, state.selectedAppliances, "appliancesTagListTitle");

    } else if (state.currentTagListId === "utensilsTagListTitle") {
      displaySelectedTagList(selectedUtensilsDiv, state.selectedUtensils, "utensilsTagListTitle");
    }

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

const displaySelectedTagList = (selectedDiv, currentState, tagListsTitleName) => {
  if (state.currentTagListId === tagListsTitleName) {
    selectedDiv.innerHTML = ""; // Clear HTML to avoid double

    for (const item of currentState) {
      selectedDiv.innerHTML += `<p class="menu__selects__select__items__item">${item}</p>`;
    }

    selectedDiv.style.display = selectedDiv.children.length > 0 ? "block" : "none";
  }
};

export const handleItemsSelection = (tagDivList, currentState, selectedDiv) => {
  for (const item of tagDivList.children) {
    item.addEventListener("click", () => {
      currentState.push(item.textContent);
      item.remove();
      displaySelectedTagList(selectedDiv, currentState, tagDivList.parentElement.firstElementChild.id);
    });
  }
};