const { Schema, model, Types } = require('mongoose');
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
const ThoughSchema = new Schema (
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

ReactionSchema.virtual('reactionCount').get(function() {
    return this.replies.length;
  });

  const Thought = model('Thought', ThoughSchema);

  module.exports = Thought;