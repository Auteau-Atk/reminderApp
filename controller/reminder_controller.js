// let database = require("../database");

async function getImage(keyword) {
  const url =
    "https://api.unsplash.com/search/photos?page=1&query=" +
    keyword +
    "&client_id=KG00v9FwbuggRyhkDcQI6OSDGaApoQreYPjWW2wB01A";
  const res = await fetch(url);
  const data = await res.json();
  return data.results[0].urls.regular;
}

let remindersController = {
  list: (req, res) => {
    // current_user = req.user.name;
    res.render("reminder/index", {
      reminders: req.user.reminders
      //reminders: database[current_user].reminders,
    });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    // current_user = req.user.name;
    // let searchResult = database[current_user].reminders.find(function (
    let searchResult = req.user.reminders.find(function (
      reminder
    ) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", {
        // reminders: database[current_user].reminders,
        reminders: req.user.reminders,
      });
    }
  },

  create: async (req, res) => {
    // current_user = req.user.name;
    banner_pic=req.body.banner
    banner_image= await getImage(banner_pic)
    let reminder = {
      // id: database[current_user].reminders.length + 1,
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      banner: banner_image,
      word: banner_pic
    };
    // database[current_user].reminders.push(reminder);
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    // current_user = req.user.name;
    let reminderToFind = req.params.id;
    // let searchResult = database[current_user].reminders.find(function (
    let searchResult = req.user.reminders.find(function (
      reminder
    ) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: async (req, res) => {
    // implementation here 👈
    // current_user = req.user.name;
    banner_pic=req.body.banner;

    banner_image=await getImage(banner_pic);

    let reminderToUpdateId = req.params.id;

    let updatedReminder = {
      id: parseInt(reminderToUpdateId),
      title: req.body.title,
      description: req.body.description,
      completed: false,
      banner:banner_image,
      word:banner_pic,
      completed: req.body.completed === "true",
    };

    // let index = database[current_user].reminders.findIndex(function (reminder) {
    let index = req.user.reminders.findIndex(function (reminder) {
      return reminder.id === parseInt(reminderToUpdateId);
    });
    if (index !== -1) {
      // database[current_user].reminders[index] = updatedReminder;
      req.user.reminders[index] = updatedReminder;
      res.redirect("/reminders");
    } else {
      res.status(404).send("Reminder not found");
    }
  },

  delete: (req, res) => {
    // current_user = req.user.name;
    let reminderToDeleteId = req.params.id;
    // let index = database[current_user].reminders.findIndex(function (reminder) {
    let index = req.user.reminders.findIndex(function (reminder) {
      return reminder.id === parseInt(reminderToDeleteId);
    });
    if (index !== -1) {
      // database[current_user].reminders.splice(index, 1);
      req.user.reminders.splice(index, 1);
      res.redirect("/reminders");
    } else {
      res.status(404).send("Reminder not found");
    }
  },
};

module.exports = remindersController;
