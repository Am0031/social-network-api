const { Thought } = require("../models");

const prepareThoughtsData = () => {
  //create a number of reactions with thoughtText, username and createdAt
  //populate thoughts id into User's thoughts array
};

const seedThoughts = async () => {
  const thoughts = await prepareThoughtsData();
  await Thought.insertMany(thoughts);

  console.log("[INFO]: Successfully seeded thoughts");
};

module.exports = { seedThoughts };
