import { apiCall } from './index.js';


export const getListings = async (sort) => {
  const url = `https://api.noroff.dev/api/v1/auction/listings?_bids=true&_active=true&${sort}`;

  return await apiCall(url);
};
