const express = require("express");
const { handleResponseErrors } = require("../../utility");

// helper functions
const isAuthorized = (req, res, next) => {
  // check if request is from alumni account or dean
  if (
    req.user &&
    (req.user.username === req.body.username || req.user.accountType === dean)
  ) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "You are not authorized to perform this action!" });
};

const employerRoutes = (Employer) => {
  const employerRouter = express.Router();

  employerRouter.route("/").get((req, res) => {
    // get list of all employer
    Employer.find({}).then((_employers) => {
      const newEmployers = _employers.map((_employer) => {
        const _newEmployer = _employer.toJSON();
        delete _newEmployer._id;
        delete _newEmployer.__v;
        delete _newEmployer.password;
        return _newEmployer;
      });
      res.status(200).json(newEmployers);
    });
  });
  employerRouter
    .route("/:username")
    .get((req, res) => {
      // fetch single user using username
      Employer.findOne({ username: req.params.username })
        .then((_employer) => {
          const _newEmployer = _employer.toJSON();
          delete _newEmployer._id;
          delete _newEmployer.__v;
          delete _newEmployer.password;
          res.status(200).json(_newEmployer);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .patch(isAuthorized, (req, res) => {
      // update single user using username to find user
      Employer.findOneAndUpdate(
        { username: req.params.username },
        { $set: verifyUpdates(req.body, req.user.accountType) },
        { new: true }
      )
        .then((_employer) => {
          const _newEmployer = _employer.toJSON();
          delete _newEmployer._id;
          delete _newEmployer.__v;
          delete _newEmployer.password;
          res.status(200).json(_newEmployer);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .delete(isAuthorized, (req, res) => {
      // delete user account
      Employer.findOneAndDelete({ username: req.params.username })
        .then((_res) => {
          res.status(201).json({ message: "Account successfully deleted." });
        })
        .catch((_err) => handleResponseErrors(res, _err));
    });

  return employerRouter;
};

module.exports = employerRoutes;
