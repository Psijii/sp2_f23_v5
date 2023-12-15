/**
 * Module providing user profile functionality and interactions.
 * @module userProfile
 */

 import {
  getUsersListings,
  updateProfile,
  createListing,
} from '../api/index.js';

import { 
  getUser, 
  updateUser, 
  getError 
} from '../storage/index.js';

import {
  createProfile,
  createCard,
  isLoggedIn,
  errorHtml,
  setLoader,
} from '../components/index.js';

/**
 * The user object retrieved from storage.
 * @type {Object}
 */
const user = getUser();

/**
 * Check if the user is logged in, otherwise redirect to login page.
 */
if (!isLoggedIn()) {
  location.assign('login.html');
}

/**
 * Update user information.
 */
updateUser();

/**
 * Destructuring the name property from the user object.
 * @type {string}
 */
const { name } = user;

/**
 * Container for displaying user profile information.
 * @type {HTMLElement}
 */
const profileContainer = document.querySelector('.profile-container');

/**
 * Container for displaying user's listings.
 * @type {HTMLElement}
 */
const listingsContainer = document.querySelector('.profile-listings');

/**
 * Set the HTML content of the profile container.
 */
profileContainer.innerHTML = createProfile(user);

/**
 * Button for creating a new listing.
 * @type {HTMLElement}
 */
const createListingBtn = document.querySelector('.create-listing-btn');

/**
 * Modal for creating a new listing.
 * @type {HTMLElement}
 */
const createListingModal = document.querySelector('.create-listing-modal');

/**
 * Form for creating a new listing.
 * @type {HTMLFormElement}
 */
const createListingForm = document.querySelector('.create-listing-form');

/**
 * Button for closing the create listing modal.
 * @type {HTMLElement}
 */
const createListingClose = document.querySelector('.create-listing-close');

/**
 * Date input for the create listing form.
 * @type {HTMLInputElement}
 */
const createListingDate = document.querySelector('.create-listing-date');

/**
 * Container for displaying loading signals during listing creation.
 * @type {HTMLElement}
 */
const createListingSignal = document.querySelector('.create-listing-signal-container');

/**
 * Current date object.
 * @type {Date}
 */
const currentDate = new Date();

/**
 * Date object representing the next hour from the current time.
 * @type {Date}
 */
const nextHour = new Date(currentDate.getTime() + 60 * 60 * 1000);

/**
 * String value of the next hour in ISO format.
 * @type {string}
 */
const currentValue = nextHour.toISOString().slice(0, 16);

/**
 * Input for adding media to the new listing form.
 * @type {HTMLInputElement}
 */
const addMediaInput = document.querySelector('.add-media-input');

/**
 * Button for adding media to the new listing form.
 * @type {HTMLElement}
 */
const addMediaBtn = document.querySelector('.add-media-btn');

/**
 * Container for displaying added media in the new listing form.
 * @type {HTMLElement}
 */
const addedMediaContainer = document.querySelector('.added-media-container');

/**
 * Array to store media URLs for the new listing.
 * @type {string[]}
 */
const imgArray = [];

/**
 * Event handler for the create listing form submission.
 * @function
 * @async
 * @param {Event} e - The form submission event.
 */
createListingForm.onsubmit = async (e) => {
  e.preventDefault();
  createListingSignal.innerHTML = setLoader();
  try {
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    body.media = imgArray;
    body.endsAt = new Date(body.endsAt);
    await createListing(body);
    location.reload();
  } catch (error) {
    const { errors } = getError();
    createListingSignal.innerHTML = errorHtml(errors[0].message);
  }
};

/**
 * Event handler for opening the create listing modal.
 * @function
 */
createListingBtn.onclick = () => {
  createListingDate.value = currentValue;
  createListingDate.min = currentValue;
  createListingModal.showModal();
};

/**
 * Event handler for closing the create listing modal.
 * @function
 */
createListingClose.onclick = () => {
  createListingModal.close();
  createListingForm.reset();
};

/**
 * Function to update the displayed added media in the new listing form.
 * @function
 */
const updateAddedMedia = () => {
  addedMediaContainer.innerHTML = imgArray
    .map(
      (img, index) =>
        `<p class="mt-2 pb-2">${img}<a class="a ms-2 remove-image" data-index="${index}">Remove</a></p>`
    )
    .join('');
};

/**
 * Function to add event listener for removing media in the new listing form.
 * @function
 */
const addRemoveEventListener = () => {
  addedMediaContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-image')) {
      const { index } = event.target.dataset;
      imgArray.splice(index, 1);
      updateAddedMedia();
    }
  });
};

/**
 * Event handler for adding media to the new listing form.
 * @function
 */
addMediaBtn.onclick = () => {
  const imgUrl = addMediaInput.value;
  const urlRegEx = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (urlRegEx.test(imgUrl)) {
    addMediaInput.setCustomValidity('');
    imgArray.push(imgUrl);
    updateAddedMedia();
    addMediaInput.value = '';
  } else {
    addMediaInput.setCustomValidity('Please enter a valid URL.');
    addMediaInput.reportValidity();
  }
};

/**
 * Modal for editing the user's avatar.
 * @type {HTMLElement}
 */
const editAvatarModal = document.querySelector('.edit-avatar-modal');

/**
 * Form for editing the user's avatar.
 * @type {HTMLFormElement}
 */
const editAvatarForm = document.querySelector('.edit-avatar-form');

/**
 * Button for opening the edit avatar modal.
 * @type {HTMLElement}
 */
const editAvatarOpen = document.querySelector('.edit-avatar-open');

/**
 * Button for closing the edit avatar modal.
 * @type {HTMLElement}
 */
const editAvatarClose = document.querySelector('.edit-avatar-close');

/**
 * Container for displaying signals related to avatar editing.
 * @type {HTMLElement}
 */
const avatarSignal = document.querySelector('.avatar-signal');

/**
 * Event handler for opening the edit avatar modal.
 * @function
 */
editAvatarOpen.onclick = () => {
  editAvatarModal.showModal();
};

/**
 * Event handler for closing the edit avatar modal.
 * @function
 */
editAvatarClose.onclick = () => {
  editAvatarModal.close();
  editAvatarForm.reset();
  avatarSignal.innerHTML = '';
};

/**
 * Event handler for editing the user's avatar.
 * @function
 * @async
 * @param {Event} e - The form submission event.
 */
editAvatarForm.onsubmit = async (e) => {
  e.preventDefault();
  avatarSignal.innerHTML = setLoader();
  try {
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData.entries());
    await updateProfile(body, name);
    await updateUser();
    location.reload();
  } catch (error) {
    const { errors } = getError();
    avatarSignal.innerHTML = errorHtml(errors[0].message);
  }
};

/**
 * Main function for initializing user profile page.
 * @function
 * @async
 */
const main = async () => {
  try {
    const listings = await getUsersListings(name);

    if (listings.length) {
      listingsContainer.innerHTML = listings.map(createCard).join('');
    } else {
      listingsContainer.innerHTML = `<p class="text-center fw-bold fs-4">No listings yet. </p>`;
    }
  } catch (error) {
    listingsContainer.innerHTML = errorHtml(
      'An error occurred. Please wait a while and try again.'
    );
  }
};

// Initialize the user profile page
main();
