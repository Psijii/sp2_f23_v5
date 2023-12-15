import { apiCall, options } from './index.js';

/**
 * Creates a new listing using the provided body.
 *
 * @param {object} body - The body containing information for creating the listing.
 * @returns {Promise} - A promise that resolves when the listing creation is successful.
 * @throws {Error} - If the listing creation request encounters an error.
 * @example
 * // Creates a new listing with specified details
 * await createListing({ title: 'Example Listing', description: 'A description of the listing' });
 */
export const createListing = async (body) => {
  const url = 'https://api.noroff.dev/api/v1/auction/listings';
  const method = 'post';
  return await apiCall(url, options(method, body));
};
