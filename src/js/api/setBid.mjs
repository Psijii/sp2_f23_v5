import { 
  apiCall, 
  options 
} from './index.js';

/**
 * Places a bid on a specific listing using a POST request to the specified API endpoint.
 *
 * @function
 * @async
 * @param {Object} body - The bid information to be sent in the request body.
 * @param {number} id - The unique identifier of the listing on which the bid is placed.
 * @returns {Promise} - A promise that resolves when the bid placement request is complete.
 * @throws {Error} - If the bid placement request encounters an error.
 * @example
 * // Places a bid on a specific listing
 * const bidInfo = { amount: 50, bidderName: 'JohnDoe' };
 * await placeBid(bidInfo, 123);
 */
export const placeBid = async (body, id) => {
  /**
   * The URL for the API endpoint to place a bid on the listing.
   * @type {string}
   */
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`;

  /**
   * The HTTP method for the bid placement request.
   * @type {string}
   */
  const method = 'post';

  /**
   * Sends a POST request to place a bid on the specified listing.
   * @type {Promise}
   */
  return await apiCall(url, options(method, body));
};
