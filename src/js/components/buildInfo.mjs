import { timeLeft, isLoggedIn } from "./index.js";
import { getUser } from "../storage/index.js";

//Creating jsdocs for this broke the code, so I'm leaving it out for now

// Function to create information for a listing
export const createInfo = (listing) => {
  // Get user details or set an empty object if not logged in
  const { email: userEmail, credits } = getUser() || { email: "" };

  const {
    title,
    description,
    endsAt,
    seller: { email: sellerEmail },
    bids,
  } = listing;

  // Sort bids in ascending order by amount
  let sortedBids = bids.sort((a, b) => a.amount - b.amount);

  // Determine the current bid amount
  const currentBid = sortedBids.length
    ? sortedBids[sortedBids.length - 1].amount
    : 0;

  // Function to determine if bid form should be active or disabled
  const disabled = () => {
    if (!isLoggedIn()) {
      return "disabled";
    } else if (userEmail === sellerEmail || credits <= currentBid) {
      return "disabled";
    } else {
      return "";
    }
  };

  // Function to provide additional information relevant for the bid form
  const bidOption = () => {
    if (isLoggedIn() && userEmail !== sellerEmail) {
      return `<p class="mt-3">Available credits: ${credits} Nkr.</p> ${
        disabled() ? "<p>(Insufficient funds)</p>" : ""
      }`;
    } else if (!isLoggedIn()) {
      return `        
        <p class="login-notice mt-3">
          Please <a href="./login.html">login</a> or
          <a href="./register.html">register</a> to place a bid
        </p>`;
    } else {
      return "";
    }
  };

  // Function to determine whether it is the user's own listing and return bid form or buttons for edit/delete
  const isOwnListing = () => {
    if (userEmail === sellerEmail) {
      return `<div class="edit-delete-container">
                <a class="a delete-listing-btn">Delete listing</a>
              </div>`;
    } else {
      return ` 
      <form class="d-flex bid-form">
      <input ${disabled()} type="number" class="form-control" name="amount" id="bid" aria-describedby="emailHelp" required value=${ currentBid + 1 } min=${currentBid + 1}>
      <button type="submit" ${disabled()} class="btn btn-secondary">Place bid</button>
      </form>
      ${bidOption()}
  `;
    }
  };

  // Return the HTML structure for listing information
  return ` <div>
                <h1>${title}</h1>
                <p class="description mb-5">${description || "No description available"}</p>
            </div>
            <div>
            <div class="row align-items-end">
                <div class="col"> 
                  <div class="mb-3">Time left: ${timeLeft(endsAt)}</div>
                  <p >Current bid: <span class="price"> ${currentBid} Nkr.</span></p></div>
                <div class="col mt-3">${isOwnListing()}</div>
            </div>
            </div>`;
};
