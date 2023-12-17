/**
 * Module providing functionality for displaying and searching listings.
 * @module listingDisplay
 */

import { getListings } from "../api/index.js";
import { createCard, setLoader, errorHtml } from "../components/index.js";

const listingsContainer = document.querySelector(".listings-container");
const searchField = document.querySelector(".search-field");
const searchForm = document.querySelector(".search-form");
const sort = document.querySelector("#sort");

/**
 * Function to handle the change event on the sort dropdown.
 * @param {Event} e - The event object.
 */
sort.onchange = (e) => {
  e.target.value ? main() : null;
};

/**
 * Main function that fetches listings based on the selected sorting option and updates the UI.
 * @returns {Promise<void>} - A Promise that resolves once the main function completes.
 */
const main = async () => {
  listingsContainer.innerHTML = setLoader();
  try {
    let listings = await getListings(sort.value);

    // Filter listings based on the search field value if present
    if (searchField.value) {
      listings = listings.filter((listing) => {
        return (
          listing.title.search(searchField.value) > -1 ||
          listing.tags.includes(searchField.value)
        );
      });
    }

    // Display appropriate message if no listings are found
    if (!listings.length) {
      listingsContainer.innerHTML = '<p class="fw-bold">No matching listing was found. Please consider trying a different search.</p>';
    } else {
      // Update the listings container with the generated cards
      listingsContainer.innerHTML = listings
        .map((listing) => createCard(listing))
        .join('');
    }
  } catch (error) {
    // Display error message if an error occurs during the main function
    listingsContainer.innerHTML = errorHtml(
      "Apologies for the inconvenience. Please wait for a moment and try your request again."
    );
  }
};

/**
 * Event handler for the search form submission.
 * @param {Event} e - The event object.
 */
searchForm.onsubmit = async (e) => {
  e.preventDefault();
  await main();
  searchForm.reset();
};

// Initial call to the main function to load listings on page load
main();
