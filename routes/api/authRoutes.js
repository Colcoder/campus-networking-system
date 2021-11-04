const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { CustomError, getUserByUsername } = require("../../utility");

const authRoutes = (Alumni, Employer, Dean) => {
  const authRouter = express.Router();
  const models = { dean: Dean, alumni: Alumni, employer: Employer };

  authRouter.route("/login").post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  // registration endpointfor all account types
  authRouter.route("/register").post(async (req, res) => {
    // request body must contain a password, username and role based on account type to be created
    try {
      const salt = await bcrypt.genSalt();
      if (!req.body.password || !req.body.role || !req.body.username) {
        throw new CustomError(
          "Password and username required.",
          "Missing Field"
        );
      }
      // check if username already in use
      const userExists = await getUserByUsername(req.body.username);
      if (userExists) {
        return res.status(400).json({ message: "Username already in use" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new models[req.body.role]({
        ...req.body,
        password: hashedPassword,
      });
      user.save((err) => {
        if (err) throw err;
      });
      return res
        .status(201)
        .json({ message: user.username + " account successfully created." });
    } catch (error) {
      res.json({ error: error.message, code: error.name });
    }
  });

  authRouter.route("/logout").delete((req, res) => {
    req.logOut();
    req.redirect("/login");
  });
  return authRouter;
};

module.exports = authRoutes;
