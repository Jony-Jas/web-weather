const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=<ENTER YOUR KEY>&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect", undefined);
    } else if (res.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${res.body.current.weather_descriptions[0]} It is currently ${res.body.current.temperature} farenhiet`
      );
    }
  });
};

module.exports = forecast;
