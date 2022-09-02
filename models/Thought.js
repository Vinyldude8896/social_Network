const { Schema, model, Types } = require('mongoose');

// importing date format until function
const dateFormat = require('../utils/dateFormat');

// Reaction Model Schema
const ReactionSchema = new Schema (
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
      getters: true
    }
  }
);



// Thought model Schema
const ThoughtSchema = new Schema (
{
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:(createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true
      },
  id: false
}
);

// creating virtual to count the length of the reactions subdocument array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  // creating a model of the Thought Schema for export
  const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;