const express = require("express");
const { handleResponseErrors } = require("../../utility");

const isAuthorized = (req, res, next) => {
  // check if request is from alumni account or dean
  if (
    req.user &&
    (req.user.username === req.body.username || req.user.accountType === "dean")
  ) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "You are not authorized to perform this action!" });
};

const verifyUpdates = (_updates, accountType) => {
  // only allow updates allowed to user as per accountType in system
  if (accountType !== "dean" && _updates.grade) {
    delete _updates.grade;
    return _updates;
  }
  return _updates;
};

const alumniRoutes = (Alumni) => {
  const alumniRouter = express.Router();

  alumniRouter.route("/").get((req, res) => {
    // get list of all alumni
    Alumni.find({}).then((_alumnus) => {
      const newAlumnus = _alumnus.map((_alumni) => {
        const _newAlumni = _alumni.toJSON();
        delete _newAlumni._id;
        delete _newAlumni.__v;
        delete _newAlumni.password;
        return _newAlumni;
      });
      res.status(200).json(newAlumnus);
    });
  });
  alumniRouter
    .route("/:username")
    .get((req, res) => {
      // fetch single user using username
      Alumni.findOne({ username: req.params.username })
        .then((_alumni) => {
          const _newAlumni = _alumni.toJSON();
          delete _newAlumni._id;
          delete _newAlumni.__v;
          delete _newAlumni.password;
          res.status(200).json(_newAlumni);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .patch(isAuthorized, (req, res) => {
      // update single user using username to find user
      Alumni.findOneAndUpdate(
        { username: req.params.username },
        { $set: verifyUpdates(req.body, req.user.accountType) },
        { new: true }
      )
        .then((_alumni) => {
          const _newAlumni = _alumni.toJSON();
          delete _newAlumni._id;
          delete _newAlumni.__v;
          delete _newAlumni.password;
          res.status(200).json(_newAlumni);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .delete(isAuthorized, (req, res) => {
      // delete user account
      Alumni.findOneAndDelete({ username: req.params.username })
        .then((_res) => {
          res.status(201).json({ message: "Account successfully deleted." });
        })
        .catch((_err) => handleResponseErrors(res, _err));
    });

  return alumniRouter;
};

module.exports = alumniRoutes;
