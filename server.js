"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const path        = require('path');
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const updatesRoutes = require("./routes/updates");
const orderRoutes = require("./routes/order");
const menuRoutes  = require("./routes/menu");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(sass({
    /* Options */
    src: path.join(__dirname, 'styles'),
    dest: path.join(__dirname, 'script/styles'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/public'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/order", orderRoutes(knex));
app.use("/api/menu/", menuRoutes(knex));
app.use("/api/updates/", updatesRoutes(knex));

app.get("/u/:id", (req,res) => {
  res.render("index");
});

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/yy", (req, res) => {
  // Twilio Credentials
var accountSid = 'AC05191b676835f31d0b8df1118296384c';
var authToken = '23d754a054dd0296c9c0eac58bc8f985';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
// var client = new twilio.RestClient(accountSid, authToken);
client.messages.create({
    to: "+16475029768",
    from: "+16475572979",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});
console.log(res)

})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
