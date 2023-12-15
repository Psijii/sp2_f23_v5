/**
 * Module handling user authentication and login functionality.
 * @module login
 */

import { apiCall } from "../api/index.js";
import { storeUser, getError, updateUser } from "../storage/index.js";
import { errorHtml, setLoader } from "../components/index.js";

/**
 * Form element for user login.
 * @type {HTMLFormElement}
 */
const form = document.querySelector("form");

/**
 * Input element for user email.
 * @type {HTMLInputElement}
 */
const email = document.querySelector(".email");

/**
 * Input element for user password.
 * @type {HTMLInputElement}
 */
const password = document.querySelector(".password");

/**
 * Container for displaying loading signals or error messages.
 * @type {HTMLElement}
 */
const signalContainer = document.querySelector(".signal");

/**
 * Event handler for user login form submission.
 * @event
 * @param {Event} e - The form submission event.
 */
form.onsubmit = async (e) => {
  e.preventDefault();

  // Display loading signal
  signalContainer.innerHTML = setLoader();

  // Prepare options for the API call
  const options = {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    // Make API call for user login
    const data = await apiCall(
      "https://api.noroff.dev/api/v1/auction/auth/login",
      options
    );

    // Store user information in local storage
    storeUser(data);

    // Update user information
    await updateUser();

    // Redirect to the previous page or index.html
    location.assign(
      document.referrer.includes("/register" || "/login")
        ? "./index.html"
        : document.referrer
    );
  } catch (error) {
    // Display error message and log the error
    const { errors } = getError();
    signalContainer.innerHTML = errorHtml(errors[0].message);
    console.log(error);
  }
};
