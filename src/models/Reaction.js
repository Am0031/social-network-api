const { Schema, model, Types } = require("mongoose");
const { format } = require("date-fns");

const reactionSchema = {
  //does not override the _id but is set to be the same value as _id when creating the reaction
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },
  reactionBody: {
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
};

const schema = new Schema(reactionSchema, {
  toJSON: { getters: true },
});

const Reaction = model("Reaction", schema);

module.exports = Reaction;
