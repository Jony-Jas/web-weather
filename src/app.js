const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup public directory
app.use(express.static(public));

// Setup view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app
  .get("/", (req, res) => {
    res.render("index", {
      title: "Weather App",
      name: "Jony",
    });
  })
  .get("/about", (req, res) => {
    res.render("about", {
      title: "About",
      name: "Jony",
    });
  })
  .get("/help", (req, res) => {
    res.render("help", {
      title: "Help Page",
      content: "This is a help page",
    });
  })
  .get("/weather", (req, res) => {
    if (!req.query.address) {
      return res.send({
        error: "Please Enter a valid location",
      });
    }
    geocode(
      req.query.address,
      (err, { lattitide, longitude, location } = {}) => {
        if (err) {
          return res.send({ error: err });
        }
        forecast(lattitide, longitude, (err, forecastData) => {
          if (err) {
            return res.send({ error: err });
          }
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  })
  .get("/help/*", (req, res) => {
    res.render("helpnot", {
      title: "404 Error",
      errMsg: "Help article not found",
    });
  })
  .get("*", (req, res) => {
    res.render("404", { title: "404 Not found" });
  })
  .listen(8080, () => {
    console.log("Server is running");
  });
