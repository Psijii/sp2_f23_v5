/**
 * Generates HTML markup for displaying a bid history, including bidder names and bid amounts.
 *
 * @function
 * @param {Array} bids - An array of bid objects, each containing bidderName and amount.
 * @returns {string} - HTML markup for displaying the bid history.
 * @example
 * // Returns HTML markup for displaying a bid history
 * const historyMarkup = bidHistory([{ bidderName: 'John Doe', amount: 50 }, { bidderName: 'Jane Smith', amount: 60 }]);
 */
export const bidHistory = (bids) => {
  /**
   * HTML markup for displaying the bid history.
   * @type {string}
   */
  return bids
    .map((bid) => {
      /**
       * Bidder name from the bid object.
       * @type {string}
       */
      const { bidderName, amount } = bid;

      /**
       * HTML markup for displaying a single bid entry in the bid history.
       * @type {string}
       */
      return `<p class="mt-1">${bidderName} (${amount} Nkr.)</p>`;
    })
    .join('');
};
