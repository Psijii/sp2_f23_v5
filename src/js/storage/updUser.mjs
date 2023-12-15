/**
 * Retrieves user information from the local storage.
 *
 * @returns {Object} The user object retrieved from local storage.
 */
import { getUser, storeUser } from "./index.js";
import { getUserFromApi } from "../api/index.js";
 
/**
  * Updates the user information by fetching data from the API
  * and storing the updated information locally.
  *
  * @async
  * @function
  * @returns {Promise<void>} A promise that resolves once the user information is updated.
  */
export const updateUser = async () => {
// Get user information from local storage
  const localUser = getUser();
 
  // Extract the name from the local user
  const { name } = localUser;
 
  // Fetch updated user information from the API
  const updatedUser = await getUserFromApi(name);
 
  // Extract specific properties from the updated user
  const { credits, avatar, wins } = updatedUser;
 
  // Store the updated user information locally
  storeUser({ ...localUser, credits, avatar, wins });
};
 