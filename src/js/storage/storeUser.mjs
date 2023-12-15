/**
 * Stores user credentials in the local storage.
 *
 * @param {Object} user - The user object containing credentials to be stored.
 * @param {string} user.name - The user's name.
 * @param {number} user.credits - The user's credits.
 * @param {string} user.avatar - The URL of the user's avatar.
 * @param {number} user.wins - The number of wins the user has.
 * @returns {void} - No return value.
 */
export const storeUser = (user) => {
  localStorage.setItem("credentials", JSON.stringify(user));
};
