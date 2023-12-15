import { errorHtml, setLoader } from "../components/index.js";
import { getError } from "../storage/index.js";

/**
 * Handles the form submission event.
 * @param {Event} e - The form submission event.
 */
const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  if (!profile.avatar) {
    delete profile.avatar;
  }

  // Display loader while processing the form
  signalContainer.innerHTML = setLoader();

  try {
    // Redirect to the login page after successful submission
    location.assign("login.html");
  } catch (error) {
    // Handle errors and display error message
    const { errors } = getError();
    signalContainer.innerHTML = errorHtml(errors[0].message);
    console.log(error);
    localStorage.removeItem("error");
  }
};

// Select the form element
const form = document.querySelector("form");
// Select the signal container element
const signalContainer = document.querySelector(".signal");

// Attach the form submission handler
form.onsubmit = handleSubmit;
