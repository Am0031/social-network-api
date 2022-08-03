const { Schema, model } = require("mongoose");

const userSchema = {};

const schema = new Schema(userSchema);

const User = model("User", schema);

module.exports = User;
