const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//define path for Express config
const staticDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static diractory to serve
app.use(express.static(staticDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "huyen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Huyen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some helpful text.",
    title: "Help",
    name: "Huyen",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // else {
  //   res.send({
  //     forecast: "It is raining",
  //     address: req.query.address,
  //   });
  // }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term!",
    });
  } else {
    console.log(req.query);
    res.send({ products: [] });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Huyen",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Huyen",
    errorMessage: "Page  not found",
  });
});

app.listen(port, () => {
  console.log("Server is listening in port " + port + "...");
});
