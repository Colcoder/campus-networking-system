const express = require("express");

const employerRoutes = (Employer) => {
  const employerRouter = express.Router();

  employerRouter.get("/", (req, res) => {});

  return employerRouter;
};

module.exports = employerRoutes;
