/**
 * Module providing functionality for managing navigation buttons based on user authentication status.
 * @module navButtons
 */

 import { isLoggedIn, logOut } from './index.js';

 /**
  * HTML markup for the "Log out" button.
  * @type {string}
  */
 const logout = `<button class="btn btn-outline-secondary logout-btn">Log out</button>`;
 
 /**
  * HTML markup for the "Sign in" button.
  * @type {string}
  */
 const login = `<a href="./login.html" class="btn btn-outline-secondary">Sign in</a>`;
 
 /**
  * HTML markup for the "Register" button.
  * @type {string}
  */
 const register = `<a href="./register.html" class="btn btn-primary ms-3">Register</a>`;
 
 /**
  * Container element for displaying navigation buttons.
  * @type {HTMLElement}
  */
 const container = document.querySelector('.nav-btn-container');
 
 /**
  * Function to manage and display navigation buttons based on user authentication status.
  * @function
  */
 const navBtns = () => {
   /**
    * Check if the user is logged in.
    * @type {boolean}
    */
   if (isLoggedIn()) {
     // Display the "Log out" button and attach event listener for logout
     container.innerHTML = logout;
     document.querySelector('.logout-btn').onclick = () => logOut();
   } else {
     // Display the "Sign in" and "Register" buttons if the user is not logged in
     container.innerHTML = login + register;
   }
 };
 
 // Initialize navigation buttons on page load
 navBtns();
 