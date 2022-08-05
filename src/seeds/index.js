const connectToDatabase = require("../config/connection");

const { User, Thought, Reaction } = require("../models");
const { seedReactions } = require("./reactions");
const { seedThoughts } = require("./thoughts");
const { seedUsers } = require("./users");

const init = async () => {
  try {
    await connectToDatabase();

    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // seed users
    await seedUsers();

    // seed Thoughts
    await seedThoughts();

    // seed Reactions
    // await seedReactions();
  } catch (error) {
    console.log(`[ERROR]: Failed to seed DB | ${error.message}`);
  }

  process.exit(0);
};

init();
