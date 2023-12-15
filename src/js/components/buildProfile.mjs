/**
 * Generates HTML markup for displaying a user profile including name, avatar, credits, and auction wins.
 *
 * @function
 * @param {Object} profile - The user profile object containing name, avatar, credits, and wins.
 * @param {string} profile.name - The name of the user.
 * @param {string} [profile.avatar] - The URL of the user's avatar image.
 * @param {number} profile.credits - The available credits for the user.
 * @param {Array} profile.wins - The array of auction wins by the user.
 * @returns {string} - HTML markup for displaying the user profile.
 * @example
 * // Returns HTML markup for displaying a user profile
 * const profileMarkup = createProfile({ name: 'John Doe', avatar: 'avatar.jpg', credits: 100, wins: [1, 2, 3] });
 */
 export const createProfile = (profile) => {
  /**
   * The name of the user.
   * @type {string}
   */
  const { name, avatar, credits, wins } = profile;

  /**
   * HTML markup for displaying the user profile.
   * @type {string}
   */
  return `
            <img
              src=${avatar || "../assets/img/avatar_placeholder.png"}
              class="align-self-center img-thumbnail mb-3 rounded-circle profile-image"
              onerror="this.src='./assets/img/avatar_placeholder.png'" alt="Placeholder image"/>
            <a class="a edit-avatar-open mb-2">Edit Avatar</a>
            <h1 class="h2 w-100 text-center">${name}</h1>
            <div class="d-flex  align-items-start justify-content-between w-100 p-3 mt-4">
              <p>Available credits: $${credits}</p>
              <p>Auctions won: ${wins.length}</p>
            </div>
            `;
};
