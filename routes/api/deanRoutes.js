const express = require("express");

const deanRoutes = (Dean) => {
  const deanRouter = express.Router();

  deanRouter.get("/", (req, res) => {});

  return deanRouter;
};

module.exports = deanRoutes;
