const express = require("express");
const exphbs = require("express-handlebars");
const fortune = require("./lib/fortune.js");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Middleware
app.use((req, res, next) => {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || 3000);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about", {
    fortune: fortune,
    pageTestScript: "/qa/tests-about.js"
  });
});

app.get("/tours/hood-river", (req, res) => {
  res.render("tours/hood-river");
});

app.get("/tours/oregon-coast", (req, res) => {
  res.render("tours/oregon-coast");
});

app.get("/tours/request-group-rate", (req, res) => {
  res.render("tours/request-group-rate");
});
// custon 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), () => {
  console.log(`Express started on port ${app.get("port")}`);
});
