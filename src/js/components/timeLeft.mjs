/**
 * Calculates and formats the time left until a specified future time.
 *
 * @param {string} time - The future time to calculate the time difference from.
 * @returns {string} - A formatted string indicating the time left.
 *
 * @example
 * // Returns '<span class="fw-bold">2 days</span>'
 * const result = timeLeft('2023-12-31T00:00:00');
 */
 export const timeLeft = (time) => {
  const now = new Date().getTime();
  const then = new Date(time).getTime();
  const timeDiff = then - now;

  /**
   * Array of time units and their corresponding divisor values in milliseconds.
   * @type {Array<Object>}
   */
  const timeUnits = [
    { unit: 'week', divisor: 7 * 24 * 60 * 60 * 1000 },
    { unit: 'day', divisor: 24 * 60 * 60 * 1000 },
    { unit: 'hour', divisor: 60 * 60 * 1000 },
    { unit: 'minute', divisor: 60 * 1000 },
    { unit: 'second', divisor: 1000 },
  ];

  /**
   * Iterate through time units and find the first unit with a non-zero value.
   * @type {Object}
   */
  for (const { unit, divisor } of timeUnits) {
    const unitValue = timeDiff / divisor;
    if (unitValue >= 1) {
      return `<span class="fw-bold">${Math.ceil(unitValue)} ${unit}${
        unitValue >= 2 ? 's' : ''
      }</span>`;
    }
  }

  // Return 'Finished' if the time has passed
  return '<span class="fw-bold">Finished</span>';
};

