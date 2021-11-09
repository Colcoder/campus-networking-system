const express = require("express");
const { checkDean, handleResponseErrors } = require("../../utility");

// helper functions
const isAuthorized = (req, res, next) => {
  // confirm user is similar to the one who's details ae being updated
  if (req.user && req.user.username === req.params.username) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "You are not authorized to perform this action!" });
};

const deanRoutes = (Dean) => {
  const deanRouter = express.Router();

  deanRouter.route("/").get(checkDean, (req, res) => {
    // get list of all dean
    Dean.find({}).then((_deans) => {
      const newDeans = _deans.map((_dean) => {
        const _newDean = _dean.toJSON();
        delete _newDean._id;
        delete _newDean.__v;
        delete _newDean.password;
        return _newDean;
      });
      res.status(200).json(newDeans);
    });
  });
  
  deanRouter
    .route("/:username")
    .get(checkDean, (req, res) => {
      // fetch single user using username
      Dean.findOne({ username: req.params.username })
        .then((_dean) => {
          const _newDean = _dean.toJSON();
          delete _newDean._id;
          delete _newDean.__v;
          delete _newDean.password;
          res.status(200).json(_newDean);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .patch(isAuthorized, (req, res) => {
      // update single user using username to find user
      Dean.findOneAndUpdate(
        { username: req.params.username },
        { $set: req.body },
        { new: true }
      )
        .then((_dean) => {
          const _newDean = _dean.toJSON();
          delete _newDean._id;
          delete _newDean.__v;
          delete _newDean.password;
          res.status(200).json(_newDean);
        })
        .catch((_err) => handleResponseErrors(res, _err));
    })
    .delete(checkDean, (req, res) => {
      // delete user account
      Dean.findOneAndDelete({ username: req.params.username })
        .then((_res) => {
          res.status(201).json({ message: "Account successfully deleted." });
        })
        .catch((_err) => handleResponseErrors(res, _err));
    });

  return deanRouter;
};

module.exports = deanRoutes;
