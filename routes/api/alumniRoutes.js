const express = require("express");

const alumniRoutes = (Alumni) => {
  const alumniRouter = express.Router();

  alumniRouter.get("/", (req, res) => {});

  return alumniRouter;
};

module.exports = alumniRoutes;
