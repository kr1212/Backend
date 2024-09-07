const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDL2Ifs1MUay028rtBcgG9viq29JuuPPiQ";

async function getCoordinates(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  
  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("COuld not find location for specified address", 422);
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordinates;
