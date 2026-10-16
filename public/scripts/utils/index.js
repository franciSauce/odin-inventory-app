/**
 * Selects and returns the first DOM element that matches the given CSS selector.
 * @param {string} selector - The CSS selector to match.
 * @returns {Element|null} The first matching DOM element, or null if no match is found.
 */
const $ = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.log(error)
  }
};

/**
 * Sets up a dialog to open and close when the open button is clicked or when clicking outside the dialog.
 * @param {HTMLElement} openBtn - The button that opens the dialog.
 * @param {HTMLDialogElement} dialog - The dialog element to be controlled.
 */
const setupDialog = (openBtn, dialog) => {
  openBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
}

/**
 * Sets up a filterable dropdown for the given input element.
 * @param {HTMLInputElement} input - The input element to attach the dropdown to.
 * @param {HTMLDialogElement} dialog - The ID of the dialog element containing the dropdown buttons.
 * @param {string} containerClass - The class name of the container holding the dropdown buttons.
 * @param {string} dataId - The data attribute name used to store the ID of the selected item.
 */

