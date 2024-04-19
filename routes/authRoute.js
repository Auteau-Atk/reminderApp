const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

// Middleware to store user's name in session
function storeUserNameInSession(req, res, next) {
  if (req.user) {
    req.session.userName = req.user.name; // Assuming user's name is stored in req.user.name
  }
  next();
}

router.get("/dashboard", storeUserNameInSession, (req, res) => {
  // Retrieve user's name from session
  const userName = req.session.userName;
  res.render("dashboard", { userName }); // Pass userName to the dashboard template
});

module.exports = router;
