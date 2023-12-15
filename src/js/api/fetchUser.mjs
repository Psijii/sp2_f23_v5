import { apiCall, options } from "./index.js";

/**
 * Retrieves user information, including listings, from the API.
 *
 * @param {string} name - The name of the user.
 * @returns {Promise} - A promise that resolves with user information when the request is complete.
 * @throws {Error} - If the user information request encounters an error.
 * @example
 * // Retrieves user information with listings
 * const userInformation = await getUserFromApi('username123');
 */
export const getUserFromApi = async (name) => {
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}?_listings=true`;
  return await apiCall(url, options());
};

/**
 * Retrieves listings associated with a user from the API, including bids.
 *
 * @param {string} name - The name of the user.
 * @returns {Promise} - A promise that resolves with user listings when the request is complete.
 * @throws {Error} - If the user listings request encounters an error.
 * @example
 * // Retrieves listings associated with a user
 * const userListings = await getUsersListings('username123');
 */
export const getUsersListings = async (name) => {
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings?_bids=true`;
  return await apiCall(url, options());
};
