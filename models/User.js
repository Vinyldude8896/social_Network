const { Schema, model } = require('mongoose');
// const validateEmail = require('../utils/emailFormat');

// user model Schema
const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
              }
            ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
              }
            ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
          },
      id: false
    }
);


// virtual to count the legnth of the friends subdocument array
UserSchema.virtual('FriendsCount').get(function() {
    return this.friends.length;
  });

  // creating a model of the user schema for export
const User = model('User', UserSchema);

module.exports = User;
