const models = {
  alumni: require("./models/alumniModel"),
  dean: require("./models/deanModel"),
  employer: require("./models/employerModel"),
};

class CustomError extends Error {
  // generate customized error messages and codes
  constructor(message, name, ...params) {
    super(...params);
    this.name = name;
    this.message = message;
  }
}

const getUserByUsername = async (username) => {
  // check across the three account collections to find user with given username
  let _user;
  const searchInCategory = async (category, username) => {
    const handleError = (err) => (err ? err : null);
    await models[category]
      .findOne({ username })
      .then((user) => {
        if (user && user !== undefined) {
          _user = user;
        }
        return _user;
      })
      .catch((err) => handleError(err));
  };

  const isAlumni = searchInCategory("alumni", username);
  const isEmployer = searchInCategory("employer", username);
  const isDean = await searchInCategory("dean", username);

  return Promise.all([isDean, isAlumni, isEmployer]).then((results) => {
    return _user;
  });
};

const getUserByDBId = async (id) => {
  // check across the three account collections to find user with given id
  let _user;
  const searchInCategory = async (category, id) => {
    const handleError = (err) => (err ? err : null);
    await models[category]
      .findById(id)
      .then((user) => {
        if (user && user !== undefined) {
          _user = user;
        }
      })
      .catch((err) => handleError(err));
    return _user;
  };

  const isAlumni = searchInCategory("alumni", id);
  const isEmployer = searchInCategory("employer", id);
  const isDean = searchInCategory("dean", id);
  return Promise.all([isDean, isAlumni, isEmployer]).then((results) => {
    return _user;
  });
};

const checkDean = (req, res, next) => {
  // check if logged in account is a dean
  return !res.user && req.user.accountType !== "dean"
    ? res.status(401).json({ message: "Sorry! Unauthorized." })
    : next();
};

const handleResponseErrors = (res, _err) => {
  // an error handler for internal server errors and databse errors
  console.log(_err);
  res.status(500).json({ errorMessage: "Sorry! An error occured." });
};

module.exports = {
  getUserByDBId,
  handleResponseErrors,
  CustomError,
  checkDean,
  getUserByUsername,
};
