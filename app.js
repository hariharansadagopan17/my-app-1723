const axios = require('axios');

// API endpoint
const apiUrl = 'https://gorest.co.in/public/v2/users';

// Number of requests to make
const numberOfRequests = 50;

// Total time allowed for requests in milliseconds (3 minutes)
const totalTimeAllowed = 3 * 60 * 1000;

// Calculate the delay between each request
const delayBetweenRequests = totalTimeAllowed / numberOfRequests;

/**
 * Function to make a single GET request and log the status code
 * @param {number} requestNumber - The number of the current request
 */
const makeRequest = async (requestNumber) => {
  try {
    const response = await axios.get(apiUrl);
    console.log(`Request ${requestNumber}: Status Code ${response.status}`);
  } catch (error) {
    // Log the error status if available, otherwise log a general error
    if (error.response) {
      console.error(`Request ${requestNumber}: Error Status ${error.response.status}`);
    } else {
      console.error(`Request ${requestNumber}: Error making request - ${error.message}`);
    }
  }
};

/**
 * Function to make multiple requests with a delay
 */
const makeMultipleRequests = async () => {
  for (let i = 1; i <= numberOfRequests; i++) {
    await makeRequest(i);
    // Wait for the calculated delay before making the next request
    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
  console.log('All requests completed.');
};

// Start making the requests
makeMultipleRequests();