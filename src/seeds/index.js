require("dotenv").config();
const mongoose = require("mongoose");

const { User, Thought, Reaction } = require("../models");
const { seedReactions } = require("./reactions");
const { seedThoughts } = require("./thoughts");
const { seedUsers } = require("./users");

const init = async () => {
  try {
    const DB_NAME = process.env.DB_NAME;
    const MONGODB_URI =
      process.env.MONGODB_URI || `mongodb://0.0.0.0:27017/${DB_NAME}`;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGODB_URI, options);

    console.log("[INFO]: Successfully connected to DB");

    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // seed users
    await seedUsers();

    // seed Thoughts
    await seedThoughts();

    // seed Reactions
    await seedReactions();
  } catch (error) {
    console.log(`[ERROR]: Failed to seed DB | ${error.message}`);
  }

  process.exit(0);
};

init();
