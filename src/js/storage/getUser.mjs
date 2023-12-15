/**
 * Retrieves user credentials from the local storage.
 *
 * @returns {Object | null} The user object containing credentials if available, or null if not found.
 */
 export const getUser = () => {
  return JSON.parse(localStorage.getItem('credentials'));
};
