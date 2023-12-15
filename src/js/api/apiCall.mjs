/**
 * Makes an asynchronous API call using the provided URL and options.
 *
 * @param {string} url - The URL for the API endpoint.
 * @param {Object} options - The options for the API call, including method, headers, and body.
 * @returns {Promise} - A promise that resolves with the JSON response if the API call is successful.
 * @throws {Error} - If the API call encounters an error, including non-successful HTTP status codes.
 * @example
 * // Makes an API call to retrieve data
 * const responseData = await apiCall('https://api.example.com/data', { method: 'get' });
 */
 export const apiCall = async (url, options) => {
  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  }

  const errorObject = await response.json();
  localStorage.setItem('error', JSON.stringify(errorObject));

  throw new Error(`${response.status} ${response.statusText}`);
};
