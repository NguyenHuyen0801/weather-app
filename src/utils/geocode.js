const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoibmd1eWVuaHV5ZW4iLCJhIjoiY2t5aWg5eDM3MXNpaDJwbGtmMzVqcnp3ayJ9.bPTKpFPzXV-ARbNuQAY8Yw";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("location is not found. search again", undefined);
    } else
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
  });
};

module.exports = geocode;
