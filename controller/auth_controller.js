const { userModel } = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    const { email, password } = req.body;

    try {
      const user = userModel.findOne(email);
      if (user.password === password) {
        req.session.user = user; 
        res.redirect("/dashboard"); 
      } else {
        res.render("auth/login", { error: "Invalid email or password" });
      }
    } catch (error) {
      res.render("auth/login", { error: "Invalid email or password" });
    }
  },

  registerSubmit: (req, res) => {
    const { name, email, password } = req.body;

    try {
      userModel.findOne(email);
      res.render("auth/register", { error: "Email is already registered" });
    } catch (error) {
      const newUser = {
        id: userModel.database.length + 1, 
        name,
        email,
        password
      };

      userModel.database.push(newUser);
      req.session.user = newUser; 
      res.redirect("/dashboard"); 
    }
  },

  isAuthenticated: (req, res, next) => {
    if (req.session.user) { 
      return next(); 
    } else {
      res.redirect("/login"); 
    }
  }
};

module.exports = authController;
