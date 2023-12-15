/**
 * Module providing functionality for displaying and searching listings.
 * @module listingDisplay
 */

import { getListings } from "../api/index.js";
import { createCard, setLoader, errorHtml } from "../components/index.js";

/**
 * Container for displaying listings.
 * @type {HTMLElement}
 */
const listingsContainer = document.querySelector(".listings-container");

/**
 * Input field for searching listings.
 * @type {HTMLInputElement}
 */
const searchField = document.querySelector(".search-field");

/**
 * Form element for submitting search queries.
 * @type {HTMLFormElement}
 */
// eslint-disable-next-line no-unused-vars
const searchForm = document.querySelector(".search-form");

/**
 * Select element for sorting listings.
 * @type {HTMLSelectElement}
 */
const sort = document.querySelector("#sort");

/**
 * Event handler for the change event on the sort select element.
 * @event
 * @param {Event} e - The change event.
 */
sort.onchange = (e) => {
  e.target.value ? main() : null;
};

/**
 * Main function for initializing the display of listings.
 * @function
 * @async
 */
/**
 * Event handler for the change event on the sort select element.
 * @event
 * @param {Event} e - The change event.
 */
sort.onchange = async () => {
  await main();
};

/**
 * Main function for initializing the display of listings.
 * @function
 * @async
 */
const main = async () => {
  listingsContainer.innerHTML = setLoader();
  try {
    let listings;

    if (sort.value === "created") {
      // Sort by creation date
      listings = await getListings("sort=created&sortOrder=asc");
    } else {
      // Default sorting (e.g., by title)
      listings = await getListings(sort.value || "defaultSort"); // Make sure to handle default sorting
    }

    // Filter listings based on search query if provided
    if (searchField.value) {
      listings = listings.filter((listing) => {
        return (
          listing.title.search(new RegExp(searchField.value, "i")) > -1 ||
          listing.tags.includes(searchField.value)
        );
      });
    }

    // Display appropriate message if no listings are found
    if (!listings.length) {
      // eslint-disable-next-line quotes
      listingsContainer.innerHTML ='<p class="fw-bold">"No matching listing was found. Please consider trying a different search.</p>';
    } else {
      // Display listings using createCard function
      listingsContainer.innerHTML = listings
        .map((listing) => createCard(listing))
        .join("");
    }
  } catch (error) {
    // Display error message if an error occurs during fetching or processing
    listingsContainer.innerHTML = errorHtml(
      "Apologies for the inconvenience. Please wait for a moment and try your request again."
    );
  }
};

// Initialize the display of listings on page load
main();
