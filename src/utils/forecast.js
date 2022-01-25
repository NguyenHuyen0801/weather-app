const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b199abaf4da8246a1a243bf95a049397&query=" +
    latitude +
    "," +
    longtitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connnect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else callback(undefined, response.body.current);
  });
};
module.exports = forecast;
