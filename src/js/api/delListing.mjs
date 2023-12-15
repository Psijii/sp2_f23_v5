import { apiCall, options } from "./index.js";

/**
 * Deletes a listing using the specified ID.
 *
 * @param {number} id - The ID of the listing to be deleted.
 * @returns {Promise} - A promise that resolves when the deletion is successful.
 * @throws {Error} - If the deletion request encounters an error.
 * @example
 * // Deletes a listing with ID 123
 * await deleteListing(123);
 */
export const deleteListing = async (id) => {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  const method = "delete";
  return await apiCall(url, options(method));
};
