/**
 * Updates a user profile with new information, including media, using a PUT request to the specified API endpoint.
 *
 * @function
 * @async
 * @param {Object} body - The updated profile information to be sent in the request body.
 * @param {string} name - The name of the user whose profile is being updated.
 * @returns {Promise} - A promise that resolves when the profile update request is complete.
 * @throws {Error} - If the profile update request encounters an error.
 * @example
 * // Updates a user profile with new information
 * const updatedProfile = { avatar: 'new-avatar.jpg', bio: 'Updated bio' };
 * await updateProfile(updatedProfile, 'JohnDoe');
 */
export const updateProfile = async (body, name) => {
  /**
   * The URL for the API endpoint to update the user profile.
   * @type {string}
   */
  const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/media`;

  /**
   * The HTTP method for the profile update request.
   * @type {string}
   */
  const method = 'put';

  /**
   * Sends a PUT request to update the user profile with the provided information.
   * @type {Promise}
   */
  return await apiCall(url, options(method, body));
};
