const { Schema, model, Types } = require("mongoose");
const { format } = require("date-fns");

const reactionSchema = {
  //does not override the _id, it is an additional field created so to make sure it doesn't have 2 id values, it is set to be the same value as _id when creating the reaction
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
    maxLength: 2000,
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
//_id: false -> removed because not allowed - must always be an _id with actual name of _id when creating a document (unless using sharding? but no idea how to do that)
const schema = new Schema(reactionSchema, {
  toJSON: { getters: true },
});

const Reaction = model("Reaction", schema);

module.exports = Reaction;
