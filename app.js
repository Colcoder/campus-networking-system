const express = require("express");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const initializePassport = require("./passport-config");

const app = express();
// runs on port set in evironment variables or 3000
const port = process.env.PORT || 3000;
//connects to db set in environment variables or collection called mku
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mku";
const pathToKey = path.join(__dirname, "./cryptography/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");
// connecting db
const db = mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    err
      ? console.log(`there is a problem: ${err.message}`)
      : console.log("DB successfully connected");
  }
);
// maintain connection to db
mongoose.connection;

// setup session management to allow for a logged in user session to be maintained
app.use(
  session({
    secret: PUB_KEY,
    resave: true,
    saveUninitialized: false,
  })
);
// declare and initialize passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// allow for api to pare/recieve json in request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//css static file
app.use(express.static(path.join(__dirname, "/public")));
// js static files
app.use(express.static(path.join(__dirname, "./views/js")));

// adding routes
app.use(require("./routes"));

//server
app.listen(port, () => {
  console.log("Server running on port 3000...");
});
