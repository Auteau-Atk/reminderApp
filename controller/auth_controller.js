const { userModel } = require("../models/userModel");

let authController = {
  login: (req, res) => {
    res.render("auth/login", {user:req.user});
  },

  register: (req, res) => {
    res.render("auth/register",{email:req.query.email, user:req.user});
  },

  loginSubmit: (req, res) => {
    const { email, password } = req.body;

    try {
      const user = userModel.findOne(email);
      if (user.password === password) {
        req.session.user = user; 
        res.redirect("/reminders"); 
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
      res.redirect("/reminders"); 
    }
  },

  isAuthenticated: (req, res, next) => {
    if (req.session.user) { 
      return next(); 
    } else {
      res.redirect("/login"); 
    }
  },
  adminPage:(req, res, next) => {
    sessions = req.sessionStore;
    sessions.all(function (err, sessions) {
      if (err) {
        console.log(err);
      } else {
        res.render("admindashboard", {
          user: req.user,
          sessions: sessions,
        });
      }
    });
  }
};

module.exports = authController;
