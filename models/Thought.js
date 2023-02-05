const { Schema, model, Type } = require("mongoose");

// Reaction Subdoc Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
    get: (date) => {
      return date.toLocaleString();
    },
  },
});

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    created_at: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return date.toLocaleString();
      },
    },
    username: { type: String, required: true }, // reference to user model?
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual reactionCont
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Compile model
const Thought = model("thought", thoughtSchema);

// export model
module.exports = Thought;
