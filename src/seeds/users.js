const { User } = require("../models");
const { faker } = require("@faker-js/faker");

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

const allocateFriends = async () => {
  const users = await User.find({});

  for (let i = 0; i < users.length; i += 1) {
    const { _id: userId } = users[i];
    //get a random number for the number fo friends to allocate
    const numberOfFriends = Math.floor(Math.random() * 5);

    let f = numberOfFriends;
    let chosenFriendsId = [];
    while (f > 0) {
      const filteredUsers = users.filter((user) => user._id !== userId);
      const friendId =
        filteredUsers[Math.floor(Math.random() * filteredUsers.length)]._id;

      const alreadyChosen = chosenFriendsId.includes(friendId);

      if (!alreadyChosen) {
        chosenFriendsId.push(friendId);
        f -= 1;
        const userToUpdate = await User.findByIdAndUpdate(userId, {
          $push: {
            friends: friendId,
          },
        });
      }
    }
  }
};

const seedUsers = async () => {
  const users = await prepareUsersData();
  const promises = users.map((user) => User.create(user));

  await Promise.all(promises);

  const friends = await allocateFriends();

  console.log("[INFO]: Successfully seeded users");
};

module.exports = { seedUsers };
