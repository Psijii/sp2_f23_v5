import { getUser } from "../storage/index.js";
import { isLoggedIn } from "../components/index.js";

/**
 * Generates options for making API requests.
 *
 * @param {string} method - The HTTP method for the API request ('get', 'post', 'put', 'delete').
 * @param {Object} [body] - The request body (optional).
 * @returns {Object} - Options object with method, headers, and body (if provided).
 * @throws {Error} - If an invalid HTTP method is provided.
 */
export const options = (method, body) => {
  const token = isLoggedIn() ? getUser().accessToken : "";

  /**
   * Headers object with content type and authorization headers.
   * @type {Object}
   */
  const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  /**
   * Options object with method and headers.
   * @type {Object}
   */
  const optionsObject = {
    method,
    headers,
  };

  // Add request body to options if provided
  if (body) {
    optionsObject.body = JSON.stringify(body);
  }

  return optionsObject;
};
