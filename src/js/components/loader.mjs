/**
 * Generates HTML markup for a loading spinner.
 *
 * @function
 * @returns {string} - HTML markup for a loading spinner.
 * @example
 * // Returns '<div class="spinner-border text-primary m-auto" role="status"><span class="visually-hidden">Loading...</span></div>'
 * const loaderMarkup = setLoader();
 */
export const setLoader = () => {
  /**
   * HTML markup for a loading spinner.
   * @type {string}
   */
  return `<div class="spinner-border text-secondary m-auto" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>`;
};
