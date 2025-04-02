import axios from 'axios';

const API_URL = "http://20.244.56.144/evaluation-service/auth";

const requestBody = {
  email: "22052939@kiit.ac.in",
  name: "Souradip Saha",
  rollNo: "22052939",
  accessCode: "nwpwrZ",
  clientID: "0828defc-bfb1-4b78-b0e2-bb403a10afea",
  clientSecret: "UGtgtMKwjWMrbuaB"
};

// Function to send request
async function sendRequest() {
  try {
    const response = await axios.post(API_URL, requestBody);

    console.log("Response Data:", response.data);
  } catch (error: any) {

    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

// Call the function
sendRequest();


