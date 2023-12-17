/**
 * Generates HTML markup for creating a carousel slide with an image and title.
 *
 * @function
 * @param {string} img - The URL of the image to be displayed in the carousel slide.
 * @param {string} title - The title or alt text for the image.
 * @returns {string} - HTML markup for a carousel slide with the specified image and title.
 * @example
 * // Returns '<div class="carousel-item"><img src="image.jpg" alt="Sample Image" onerror="this.src='./assets/img/placeholder.jpg'" /></div>'
 * const slideMarkup = createSlide('image.jpg', 'Sample Image');
 */
export const createSlide = (img, title) => {
  const escapedTitle = title.replace(/[A-Z]/g, "\\$&");
  return `<div class="carousel-item">
      <img src="${img}" alt="${escapedTitle}" onerror="this.src='./assets/img/placeholder.jpg'">
      </div>`;
};
