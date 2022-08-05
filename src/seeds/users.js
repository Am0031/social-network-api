const { User } = require("../models");
const { faker } = require("@faker-js/faker");

// const users = [
//   {
//     username: "bob451",
//     email: "bobsmith@email.com",
//   },
//   {
//     username: "alice345",
//     email: "alicesmith@email.com",
//   },
//   {
//     username: "max610",
//     email: "maxblack@email.com",
//   },
// ];

const prepareUsersData = () => {
  const users = [];

  //create a number of users
  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.exampleEmail();
    const user = { username, email };
    users.push(user);
  }

  // return users array
  return users;
};

const seedUsers = async () => {
  const users = await prepareUsersData();
  const promises = users.map((user) => User.create(user));

  await Promise.all(promises);

  console.log("[INFO]: Successfully seeded users");
};

module.exports = { seedUsers };
