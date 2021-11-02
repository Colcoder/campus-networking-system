const User = require("./models/userModel");

class CustomError extends Error {
  // generate customized error messages and codes
  constructor(message, name, ...params) {
    super(...params);
    this.name = name;
    this.message = message;
  }
}

const getUserByDBId = async (id) => {
  const _user = await User.findById(id, (_err, user) => {
    if (_user && _user !== undefined) return _user;
    throw _err;
  });
};

module.exports = {
  getUserByDBId,
  CustomError,
};
