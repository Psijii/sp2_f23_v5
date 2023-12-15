import { options, apiCall, placeBid, deleteListing } from "../api/index.js";
import { updateUser } from "../storage/index.js";
import {
  createSlide,
  createInfo,
  setLoader,
  bidHistory,
  isLoggedIn,
} from "../components/index.js";

/**
 * Gets the listing ID from the URL parameters.
 * @type {string|null}
 */
const id = new URLSearchParams(document.location.search).get("id");

/**
 * Container for listing information.
 * @type {HTMLElement}
 */
const infoContainer = document.querySelector(".info-container");

/**
 * Container for media carousel.
 * @type {HTMLElement}
 */
const mediaContainer = document.querySelector(".carousel-inner");

/**
 * Container for bid history.
 * @type {HTMLElement}
 */
const historyContainer = document.querySelector(".history-container");

/**
 * Container for bid history display.
 * @type {HTMLElement}
 */
const bidContainer = document.querySelector(".bid-history");

/**
 * Link to toggle bid history display.
 * @type {HTMLElement}
 */
const historyLink = document.querySelector(".show-history-link");

/**
 * Back arrow element.
 * @type {HTMLElement}
 */
const backArrow = document.querySelector(".back");

/**
 * Carousel navigation buttons.
 * @type {NodeList}
 */
const carouselBtns = document.querySelectorAll(".carousel-btn");

/**
 * Flag to track bid history display state.
 * @type {boolean}
 */
let hidden = true;

/**
 * Referrer URL.
 * @type {string}
 */
const { referrer } = document;

/**
 * Current URL.
 * @type {string}
 */
const current = location.href;

/**
 * Event listener for back arrow click.
 */
backArrow.addEventListener("click", () => {
  return location.assign(referrer === current ? "index.html" : referrer);
});

/**
 * Hide bid history container if the user is not logged in.
 */
if (!isLoggedIn()) {
  bidContainer.style.display = "none";
}

/**
 * Event listener for history link click.
 */
historyLink.onclick = () => {
  historyContainer.classList.toggle("show-history");
  historyLink.innerText = hidden ? "Hide all bids" : "Show all bids";
  hidden = !hidden;
};

/**
 * Set loading state for the info container.
 */
infoContainer.innerHTML = setLoader();

/**
 * URL for fetching listing information.
 * @type {string}
 */
const url = `https://api.noroff.dev/api/v1/auction/listings/${id}?_bids=true&_seller=true`;

/**
 * Fetch listing information and update the UI.
 */
apiCall(url, options())
  .then((data) => {
    const { media, title, bids } = data;

    /**
     * Update media container with listing images or placeholder.
     */
    if (media.length) {
      mediaContainer.innerHTML = media
        .map((m) => createSlide(m, title.toLowerCase()))
        .join("");
    } else {
      mediaContainer.innerHTML =
        "<div class='carousel-item'><img src='./assets/img/placeholder.jpg'><div>";
    }

    /**
     * Hide navigation buttons if there is only one media item.
     */
    if (mediaContainer.childNodes.length === 1) {
      carouselBtns.forEach((btn) => {
        btn.style.display = "none";
      });
    }

    /**
     * Update info container with listing information.
     */
    infoContainer.innerHTML = createInfo(data);

    /**
     * Update bid history container.
     */
    historyContainer.innerHTML = bidHistory(bids);

    /**
     * Set up delete button for the listing if available.
     */
    const deleteBtn = document.querySelector(".delete-listing-btn");

    if (deleteBtn) {
      deleteBtn.onclick = async () => {
        try {
          await deleteListing(id);
        } catch (error) {
          console.log(error);
        } finally {
          location.assign("profile.html");
        }
      };
    }

    /**
     * Hide bid history container if there are no bids.
     */
    if (!bids.length) {
      bidContainer.style.display = "none";
    }

    /**
     * Set the first carousel item as active.
     */
    document.querySelector(".carousel-item").classList.add("active");
  })
  .then(() => {
    /**
     * Set up bid form submission.
     */
    const bidForm = document.querySelector("form");
    if (bidForm) {
      bidForm.onsubmit = async (e) => {
        e.preventDefault();

        try {
          const form = e.target;
          const formData = new FormData(form);
          const body = Object.fromEntries(formData.entries());
          body.amount = Number(body.amount);
          await placeBid(body, id);
          await updateUser();
          location.reload();
        } catch (error) {
          console.log(error);
        }
      };
    }
  });
