const { Schema, model } = require("mongoose");

const userSchema = {
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
    unique: true,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  ],
};

const schema = new Schema(userSchema);

const User = model("User", schema);

module.exports = User;
