const { User } = require('../models');
const {Thought} = require('../models');
const { deleteThought } = require('./thought-controller');


  // the functions will go in here as methods
  const UserController = {

    // get all Users
    getAllUser(req, res) {
       User.find({})
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get User by id and populate the thoughts and freinds
    getUserById({ params}, res) {
        User.findOne({ _id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
          path: 'friends',
          select: '-__v'
      })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // create a new user here
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update a user by ID here
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
    // Deleteing a user here, but not removing the thoughts
    // deleteUser({ params }, res) {
    //   User.findOneAndDelete({ _id: params.id})
    //   .then(dbUserData => {
    //     if (!dbUserData) {
    //       res.status(404).json({ message: 'No User wit that ID!'});
    //       return;
    //     }
    //     res.json(dbUserData)
    //   })
    //   .catch(err => res.status(400).json(err));
    // },

    // This is the delete user and their thoughts function still in progress
    deleteUser({ params }, res) {
      let thoughtsArray = {};
      User.findOne(
        { _id: params.id},
      )
        .then (dbUserData => {
          thoughtsArray = dbUserData.thoughts,
          console.log("dbuserdata.thoughts is " + dbUserData.thoughts)
          console.log(thoughtsArray)
          thoughtsArray.forEach(element => {
          console.log("The Thought ID is " + element)
          Thought.findOneAndDelete(element)
        })
        // console.log("the array of elements is " + idsToDelete);
        // for (i=0; i<= idsToDelete.length; i++){
        //   Thought.findOneAndDelete(idsToDelete[i])
        //   console.log("The ID to delete in the last function is " + idsToDelete[i]
        //   )
        // }
      })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: "No Message with that ID"});
              return;
            }
            res.json(dbUserData)
          })
          .catch(err => res.json(err));
        },

     // add friend to a user by IDs
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
  // delete a friend from a user by the ID
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId  } },
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
// adding a thought here
addThought({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.Id },
    { $addToSet: { thoughts: params.Id  } },
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

