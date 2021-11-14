const router = require("express").Router();
const path = require("path");
const AlumniModel = require("../models/alumniModel");
const EmployerModel = require("../models/employerModel");
const Dean = require("../models/deanModel");
const employerRoutes = require("./api/employerRoutes")(EmployerModel);
const alumniRoutes = require("./api/alumniRoutes")(AlumniModel);
const deanRoutes = require("./api/deanRoutes")(Dean);
const authRoutes = require("./api/authRoutes")(
  AlumniModel,
  EmployerModel,
  Dean
);

// api routes
router.use("/api/auth", authRoutes);
router.use("/api/dean", deanRoutes);
router.use("/api/alumni", alumniRoutes);
router.use("/api/employer", employerRoutes);

// frontend routes

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/login", (req, res) => {
  res.send("he");
});

//dean frontend
router.get("/deanLogin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/dean.html"));
});

router.route("/deanLogin/Registration").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/deanRegister.html"));
});

//alumni frontend
router.get("/alumniLogin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/alumni.html"));
});

router.route("/alumniLogin/signUp").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/alumniRegistration.html"));
});

//employer frontend
router.get("/employerLogin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/employer.html"));
});

router.route("/employerLogin/signUp").get((req, res) => {
  res.sendFile(path.join(__dirname, "../views/employerRegistration.html"));
});

// fallback for routes not configured, the 404 page/response
router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
