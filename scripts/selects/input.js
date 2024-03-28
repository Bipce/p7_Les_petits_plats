import { displayTagList, state } from "../index.js";

/**
 * Handle if cross should be hidden or visible
 * Set "state.tagListUserSearch" has the value of the input and display list
 * @param {InputEvent} e
 */
export const onInputChange = (e) => {
  e.target.nextElementSibling.style.display = e.target.value.length > 0 ? "block" : "none";
  state.tagListUserSearch = e.target.value;
  displayTagList();
};

/**
 * Clear input element
 * Hide cross
 * Clear "state.tagListUserSearch" and display list
 * @param {MouseEvent} e
 */
export const onClearInput = (e) => {
  e.target.previousElementSibling.value = "";
  e.target.style.display = "none";
  state.tagListUserSearch = "";
  displayTagList();
};