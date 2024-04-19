module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
  adminTester: function (req,res,nextFunction) {
    if (req.user.type=="Admin") {
      return nextFunction();
    }
    res.redirect("/reminders")
    }
};
