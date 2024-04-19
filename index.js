require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./middleware/passport");
const authController = require("./controller/auth_controller");
const reminderController = require("./controller/reminder_controller");
const path = require("path");
const {forwardAuthenticated, ensureAuthenticated, adminTester}=require("./middleware/checkAuth");
const app = express();
const port = process.env.PORT || 3001;
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  console.log(`User details: `, req.user);
  console.log(`Entire session object: `, req.session);
  console.log(`Session details: `, req.session.passport);
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    res.locals.admin = req.user.role;
  } else {
    res.locals.user = null;
    res.locals.admin = null;
  }
  next();
});

app.use("/reminders", authController.isAuthenticated);

app.get("/reminders",ensureAuthenticated, reminderController.list);
app.get("/reminder/new",ensureAuthenticated, reminderController.new);
app.get("/reminder/:id",ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit",ensureAuthenticated, reminderController.edit);
app.post("/reminder/",ensureAuthenticated, reminderController.create);
app.post("/reminder/update/:id",ensureAuthenticated, reminderController.update);
app.post("/reminder/delete/:id",ensureAuthenticated, reminderController.delete);
app.get("/login",forwardAuthenticated, authController.login);
app.get("/register", authController.register);
app.post("/register", authController.registerSubmit);

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {res.redirect("/reminders"); });
app.get("/admindashboard", ensureAuthenticated, adminTester, authController.adminPage);
app.post("/admindashboard/delete/:sid", ensureAuthenticated, adminTester, (req, res) => {
  store = req.sessionStore;
  store.destroy(req.params.sid, function (err) {
    if (err) {
      console.log(err);
    } else res.redirect("/admindashboard");
  });
}
);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running. Visit: http://localhost:${port}/reminders in your browser 🚀`);
});
