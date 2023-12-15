/**
 * Logs out the current user by clearing their data from local storage and reloading the page.
 *
 * @function
 * @example
 * // Logs out the user and reloads the page
 * logOut();
 */
export const logOut = () => {
  // Clear user data from local storage
  localStorage.clear();

  // Reload the page to reflect the logged-out state
  location.reload();
};
