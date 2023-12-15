import { timeLeft } from './timeLeft.mjs';

/**
 * Creates HTML markup for a card representing a listing.
 *
 * @param {Object} listing - The listing object containing information for the card.
 * @returns {string} - HTML markup for the listing card.
 * @example
 * // Create a card for a listing
 * const listingCard = createCard({
 *   id: 123,
 *   title: 'Example Listing',
 *   endsAt: '2023-12-31T23:59:59Z',
 *   media: ['https://example.com/image.jpg'],
 *   _count: { bids: 5 },
 *   bids: [{ amount: 50, bidderName: 'JohnDoe' }],
 * });
 */
export const createCard = (listing) => {
  const {
    id,
    title,
    endsAt,
    media,
    _count: { bids: numBids },
    bids,
  } = listing;

  const currentBid = bids.length ? bids[bids.length - 1].amount : 0;

  // Use loremflicker URL as a fallback if there are no media images
  const image = media.length ? media[0] : 'https://loremflickr.com/300/300';

  return `
    <a href="/product.html?id=${id}" class="card slide">
        <img src=${image} alt="" onerror="this.src='https://loremflickr.com/300/300'" />
        <div class="product-info">
            <h3 class="card__title">${title}</h3>
            ${timeLeft(endsAt)}
            <p class="card__bids">${numBids} bids</p>
            <p class="card__price">${currentBid} Nkr.</p>
        </div>
    </a>
  `;
};
