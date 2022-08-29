const { Schema, model } = require('mongoose');
const ThoughtSchema = require('./Thought');

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const EmailSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});

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
            validate: [validateEmail, "Please fill a valid email address"],
            match: [
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              "Please fill a valid email address",
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

UserSchema.virtual('FriendsCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;
