const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

require('dotenv').config(); // Load environment variables from .env file

const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const session = require("express-session");
const { forwardAuthenticated, ensureAuthenticated, adminTester, } = require("./middleware/checkAuth");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    res.locals.admin = req.user.role;
  } else {
    res.locals.user = null;
    res.locals.admin = null;
  }
  next();
});

app.use(expressLayouts);

// Routes start here
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
app.post("/reminder/", ensureAuthenticated, reminderController.create);

app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

app.get("/register", authController.register);

app.get("/login", forwardAuthenticated, authController.login);

app.post("/register", authController.registerSubmit);

app.post("/login", passport.authenticate("local", {
  failureRedirect: "/login",
}),authController.loginSubmit
);

app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

// Add Github authentication routes
app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to index
    res.redirect('/reminder/index');
  }
);

app.get("/admindashboard", ensureAuthenticated, adminTester, authController.adminPage);

app.post(
  "/admindashboard/delete/:sid",
  ensureAuthenticated,
  adminTester,  
  (req, res) => {
    store = req.sessionStore;
    store.destroy(req.params.sid, function (err) {
      if (err) {
        console.log(err);
      } else res.redirect("/admindashboard");
    });
  }
);

app.listen(8000, function () {
  console.log(
    "Server running. Visit: http://localhost:8000/ in your browser");
});
