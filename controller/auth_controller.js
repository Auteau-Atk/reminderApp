const { userModel } = require("../models/userModel");
let database = require("../database").database;
const { addUser } = require("./userController");


let authController = {
  login: (req, res) => {
    res.render("auth/login", {user:req.user});
  },

  register: (req, res) => {
    res.render("auth/register",{email:req.query.email, user:req.user});
  },

  loginSubmit: (req, res) => {
    res.redirect("/reminders");
  },

  registerSubmit: (req, res) => {
    addUser({
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: "User",
    })
    res.redirect('/login')
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
