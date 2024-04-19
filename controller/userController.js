const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").database;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const findOrCreate =  (object) => {
  const user = database.find((user) => user.id === object.id);

  if (!user) {
    newUser = { id: object.id,
      name: object.name,
      email: object.email,
      role: "user" };
    database.push(newUser);
  }
}

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate
};
