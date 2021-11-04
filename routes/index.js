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

// fallback for routes not configured, the 404 page/response
router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
