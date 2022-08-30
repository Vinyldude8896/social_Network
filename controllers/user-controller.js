const { User } = require('../models');

  // the functions will go in here as methods
  const UserController = {

    // get all Users
    getAllUser(req, res) {
       User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserById({ params}, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No User with this id!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User wit that ID!'});
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err));
    },
     // add friend to a user
     addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId  } },
    { new: true, runValidators: true }
    )
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: "No User with that ID"});
      return;
    }
    res.json(dbUserData)
  })
  .catch(err => res.json(err));
  },
  };


module.exports = UserController;

