const { Thought, User } = require("../models");
const { faker } = require("@faker-js/faker");

const prepareThoughtsData = async () => {
  // get all users in a users array
  const users = await User.find({});

  //for each user
  for (let i = 0; i < users.length; i += 1) {
    const { username } = users[i];
    const { _id: userId } = users[i];

    //get a random number for number of thoughts to create
    const numberOfThoughts = Math.floor(Math.random() * 10);
    for (let n = 0; n < numberOfThoughts; n += 1) {
      const thoughtText = faker.lorem.sentence();
      const createdAt = faker.date.recent();
      const thought = { thoughtText, createdAt, username };
      //create thought
      const createdThought = await Thought.create(thought);
      //add thoughtId to user's thought array
      const { _id: thoughtId } = createdThought;
      //populate thoughtId into User's thoughts array
      const userToUpdate = await User.findByIdAndUpdate(userId, {
        $push: {
          thoughts: thoughtId,
        },
      });
    }
  }
};

const seedThoughts = async () => {
  const thoughts = await prepareThoughtsData();
  console.log("[INFO]: Successfully seeded thoughts");
};

module.exports = { seedThoughts };
