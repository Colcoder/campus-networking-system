const router = require("express").Router();
const AlumniModel = require("../models/alumniModel");
const EmployerModel = require("../models/employerModel");
const Dean = require("../models/deanModel");
const employerRoutes = require("./api/employerRoutes")(EmployerModel);
const alumniRoutes = require("./api/alumniRoutes")(AlumniModel);
const authRoutes = require("./api/authRoutes")(
  AlumniModel,
  EmployerModel,
  Dean
);

// api routes
router.use("/api/auth", authRoutes);
// router.use("/api/dean", deanRoutes);
router.use("/api/alumni", alumniRoutes);
router.use("/api/employer", employerRoutes);

// frontend routes

module.exports = router;
