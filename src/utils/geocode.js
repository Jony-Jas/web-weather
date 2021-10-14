const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiMjBldWVjMDY5IiwiYSI6ImNrdWY1Y2V2bjFyNmUydW1vcnloZnJzdnIifQ.dPs91--A4OnE8wzSz8hPdw&limit=1";
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to retrieve location", undefined);
    } else if (res.body.features.length === 0) {
      callback("No matching results found", undefined);
    } else {
      callback(undefined, {
        lattitide: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
