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

function storeUserNameInSession(req, res, next) {
  if (req.user) {
    req.session.userName = req.user.name; 
  }
  next();
}

// router.get("/dashboard", storeUserNameInSession, (req, res) => {
//   const userName = req.session.userName;
//   res.render("dashboard", { userName }); 
// });

module.exports = router;
