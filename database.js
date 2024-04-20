let database = [
  {
    id: 1,
    name: "Sophia",
    email: "sophia123@gmail.com",
    password: "sophia123",
    type: "User",
    reminders: [
      {
        id: 1,
        title: "Go for a run",
        description: "Morning jog in the park",
        completed: false,
        banner: "https://images.unsplash.com/photo-1502224562085-639556652f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTI0Njh8MHwxfHNlYXJjaHwxfHxydW58ZW58MHx8fHwxNzEzNTY5NTE1fDA&ixlib=rb-4.0.3&q=80&w=1080",
        word: "run"
      },
    ],
  },
  {
    id: 2,
    name: "Liam",
    email: "liam123@gmail.com",
    password: "liam123",
    type: "User",
    reminders: [
      {
        id: 1,
        title: "Study for exam",
        description: "Review notes for upcoming test",
        completed: false,
        banner: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTI0Njh8MHwxfHNlYXJjaHwxfHxzdHVkeXxlbnwwfHx8fDE3MTM2MjI4ODF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        word: "study"
      },
    ],
  },
  {
    id: 3,
    name: "Olivia",
    email: "olivia123@gmail.com",
    password: "olivia123",
    type: "Admin",
    reminders: [
      {
        id: 1,
        title: "Attend meeting",
        description: "Discuss quarterly goals",
        completed: false,
        banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTI0Njh8MHwxfHNlYXJjaHwxfHxtZWV0aW5nfGVufDB8fHx8MTcxMzYyMjg0Nnww&ixlib=rb-4.0.3&q=80&w=1080",
        word: "meeting"
      },
    ],
  }
];


// let Database = {
//   "cindy": {
//     reminders: [
//       {
//         id: 1,
//         title: "Grocery shopping",
//         description: "Buy milk and bread from Safeway",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Pick up dry cleaning",
//         description: "Pick up the dry cleaning from Fresh Cleaners",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Call plumber",
//         description: "Call plumber to fix the leaking faucet",
//         completed: false,
//       },
//     ],
//   },
//   john: {
//     reminders: [
//       {
//         id: 1,
//         title: "Pay rent",
//         description: "Pay the monthly rent to the landlord",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Meeting with client",
//         description: "Discuss project requirements with the client",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Gym session",
//         description: "Hit the gym for a workout session",
//         completed: false,
//       },
//     ],
//   },
//   emily: {
//     reminders: [
//       {
//         id: 1,
//         title: "Buy birthday gift",
//         description: "Buy a gift for Sarah's birthday",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Submit report",
//         description: "Submit the monthly report to the manager",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Dentist appointment",
//         description: "Visit the dentist for a routine checkup",
//         completed: false,
//       },
//     ],
//   },
//   mike: {
//     reminders: [
//       {
//         id: 1,
//         title: "Attend webinar",
//         description: "Attend the webinar on machine learning",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Call parents",
//         description: "Call parents to check on them",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Buy groceries",
//         description: "Buy groceries for the week",
//         completed: false,
//       },
//     ],
//   },
//   sophia: {
//     reminders: [
//       {
//         id: 1,
//         title: "Finish coding assignment",
//         description: "Complete the coding assignment for class",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Return library books",
//         description: "Return overdue books to the library",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Call friend",
//         description: "Call Sarah to catch up",
//         completed: false,
//       },
//     ],
//   },
// };

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  createUser: (newUser) => {
    database.push({
      id: Number(newUser.id),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      type: "User",
      reminders: [],
  });
    console.log("User added");
  }
};

module.exports = {database, userModel};
