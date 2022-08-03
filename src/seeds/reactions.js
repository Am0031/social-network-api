const { Reaction } = require("../models");

const prepareReactionsData = () => {
  //create a number of reactions with id, body, username and createdAt
  //populate reactions id into thought's reactions array
};

const seedReactions = async () => {
  const reactions = await prepareReactionsData();
  await Reaction.insertMany(reactions);

  console.log("[INFO]: Successfully seeded reactions");
};

module.exports = { seedReactions };
