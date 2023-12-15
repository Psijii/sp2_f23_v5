/**
 * Retrieves an error object from the local storage.
 *
 * @returns {Object | null} The error object if available, or null if not found.
 */
export const getError = () => {
  return JSON.parse(localStorage.getItem("error"));
};
