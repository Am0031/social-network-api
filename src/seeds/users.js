const { User } = require("../models");

const users = [
  {
    username: "bob451",
    email: "bobsmith@email.com",
  },
  {
    username: "alice345",
    email: "alicesmith@email.com",
  },
  {
    username: "max610",
    email: "maxblack@email.com",
  },
];

const seedUsers = async () => {
  const promises = users.map((user) => User.create(user));

  await Promise.all(promises);

  console.log("[INFO]: Successfully seeded users");
};

module.exports = { seedUsers };
