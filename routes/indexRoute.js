const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (req.user.type == "Admin") {
    const active_sessions = req.sessionStore.sessions;

    res.render("admindashboard" ,{user: req.user, sessions: active_sessions,});
  } else {
  res.render("dashboard", {
    user: req.user,
  });
}
});

router.param("session_id", (req, res, next, session_id) => {
  req.session_id = session_id;
  
  next();
});
router.get("/dashboard/delete/:session_id", (req, res, session_id) => {
  req.sessionStore.destroy(req.session_id, (err) => {
    if (err) {
      console.log(err)
    }
    res.redirect("/dashboard")
  })
});


module.exports = router;
