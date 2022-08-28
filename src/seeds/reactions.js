const { Reaction, Thought, User } = require("../models");
const { faker } = require("@faker-js/faker");
const { add } = require("date-fns");

const prepareReactionsData = async () => {
  // get all users in a users array
  const users = await User.find({});

  //get all thoughts
  const thoughts = await Thought.find({});

  const now = new Date();

  //for each thought
  for (let i = 0; i < thoughts.length; i += 1) {
    const { username: thoughtUsername } = thoughts[i];
    const { createdAt: thoughtDate } = thoughts[i];
    const { _id: thoughtId } = thoughts[i];

    //get a random number for number of thoughts to create
    const numberOfReactions = Math.floor(Math.random() * 5);
    for (let n = 0; n < numberOfReactions; n += 1) {
      const reactionBody = faker.lorem.sentence();
      // pick date between thoughts createdAt date and now
      const createdAt = faker.date.between(thoughtDate, now);
      //filter users to exclude the author of the thought
      const otherUsers = users.filter((u) => u.username !== thoughtUsername);
      //pick a user at random in the filtered array and get their username
      const reactingUser =
        otherUsers[Math.floor(Math.random() * otherUsers.length)].username;

      //create reaction
      const reaction = { reactionBody, createdAt, username: reactingUser };
      const createdReaction = await Reaction.create(reaction);
      //add reactionId to thought's reactions array
      const { _id: reactionId } = createdReaction;
      const reactionIdToUpdate = await Reaction.findByIdAndUpdate(reactionId, {
        $set: {
          reactionId: reactionId,
        },
      });
      const thoughtToUpdate = await Thought.findByIdAndUpdate(thoughtId, {
        $push: {
          reactions: reactionId,
        },
      });
    }
  }
};

const seedReactions = async () => {
  const reactions = await prepareReactionsData();
  console.log("[INFO]: Successfully seeded reactions");
};

module.exports = { seedReactions };
