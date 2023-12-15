/**
 * Generates HTML markup for displaying an error message with a specified text.
 *
 * @function
 * @param {string} message - The error message to be displayed.
 * @returns {string} - HTML markup for displaying the error message in red text.
 * @example
 * // Returns '<p class="text-danger">Error: Invalid input</p>'
 * const errorMessage = errorHtml('Error: Invalid input');
 */
export const errorHtml = (message) => {
  /**
   * HTML markup for displaying an error message with red text.
   * @type {string}
   */
  return `<p class="text-danger">${message}</p>`;
};
