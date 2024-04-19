// Import required modules
require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./middleware/passport");
const authController = require("./controller/auth_controller");
const reminderController = require("./controller/reminder_controller");
const path = require("path");

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Set up session middleware
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

// Set the view engine to EJS
app.set("view engine", "ejs");

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to log user details and session information
app.use((req, res, next) => {
  console.log(`User details: `, req.user);
  console.log(`Entire session object: `, req.session);
  console.log(`Session details: `, req.session.passport);
  next();
});

// Protect reminder routes with authentication
app.use("/reminders", authController.isAuthenticated);

// Define reminder routes
app.get("/reminders", reminderController.list);
app.get("/reminder/new", reminderController.new);
app.get("/reminder/:id", reminderController.listOne);
app.get("/reminder/:id/edit", reminderController.edit);
app.post("/reminder/", reminderController.create);
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// Define authentication routes
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);

// Handle login form submission
app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  res.redirect("/reminders"); // Redirect to reminders page upon successful login
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(port, () => {
  console.log(`Server running. Visit: http://localhost:${port}/reminders in your browser 🚀`);
});
