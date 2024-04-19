require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./middleware/passport");
const authController = require("./controller/auth_controller");
const reminderController = require("./controller/reminder_controller");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

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

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(`User details: `, req.user);
  console.log(`Entire session object: `, req.session);
  console.log(`Session details: `, req.session.passport);
  next();
});

app.use("/reminders", authController.isAuthenticated);

app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  res.redirect("/reminders"); // Redirect to reminders page upon successful login
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running. Visit: http://localhost:${port}/reminders in your browser 🚀`);
});
