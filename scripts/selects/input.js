import { displayTagList, state } from "../index.js";

export const onInputChange = (e) => {
  e.target.nextElementSibling.style.display = e.target.value.length > 0 ? "block" : "none"; // Hide or Show cross
  state.lastUserSearch = e.target.value;
  displayTagList();
};

export const onClearInput = (e) => {
  e.target.previousElementSibling.value = ""; // Clear input element
  e.target.style.display = "none"; // Hide cross
  state.lastUserSearch = "";
  displayTagList();
};