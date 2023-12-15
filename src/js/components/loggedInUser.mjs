import { getUser } from '../storage/index.js';

/**
 * Checks if a user is currently logged in.
 *
 * @returns {boolean} - True if a user is logged in, false otherwise.
 * @example
 * // Check if a user is logged in
 * const userIsLoggedIn = isLoggedIn();
 */
export const isLoggedIn = () => {
  const user = getUser();
  return !!user;
};
