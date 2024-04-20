const userModel = require("../database").userModel;
const database = require("../database").database;
// const database = require("../models/userModel").database;

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

// const findOrCreate =  (object) => {
//   const user = database.find((user) => user.id === object.id);

//   if (!user) {
//     newUser = { id: object.id,
//       name: object.name,
//       email: object.email,
//       role: "user" };
//     database.push(newUser);
//   }
// }

function addUser(newUser) {
  userModel.createUser(newUser)
}

function isUserValid(user, password) {
  return user.password === password;
}

const lookForUser = (object) => {
  if (database.find((user) => user.id === object.id)) {
    return true;
  }
  return false;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  addUser,
  lookForUser
};
