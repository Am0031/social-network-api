const { Schema, model } = require("mongoose");
const { format } = require("date-fns");

const thoughtSchema = {
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },
  thoughtText: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
    trim: true,
    get: (val) => format(new Date(val), "yyyy-MM-dd'T'HH:mm:ss"),
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
};

const schema = new Schema(
  thoughtSchema,
  { toJSON: { virtuals: true, getters: true } },
  { toObject: { virtuals: true } }
);

schema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", schema);

module.exports = Thought;
