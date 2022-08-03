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
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
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
      ref: "User",
    },
  ],
};

const schema = new Schema(
  userSchema,
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);

schema.virtual("friendCount").get(() => this.friends.length);

schema.virtual("thoughtCount").get(() => this.thoughts.length);

// schema.virtual("friendCount", {
//   ref: "User",
//   localField: "friends",
//   foreignField: "_id",
//   count: true,
// });

const User = model("User", schema);

module.exports = User;
