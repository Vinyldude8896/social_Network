const { Thought } = require('../models');
const { User } = require('../models');


const ThoughtController = {

// get all thoughts and populate reactions
getAllThoughts(req, res) {
    Thought.find({})
.populate({
    path: 'reactions',
    select: '-__v'
})
.select('-__v')
.sort({ _id: -1})
.then(dbThoughtdata => res.json(dbThoughtdata))
.catch(err => {
    console.log(err);
    res.status(400).json(err);
});
},
// get thought by ID
getThoughtById({ params}, res) {
    Thought.findOne({ _id: params.id})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtdata => {
        if (!dbThoughtdata) {
            res.status(404).json({ message: 'No thought found with that ID'});
            return;
        }
        res.json(dbThoughtdata);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// creating a new thought here
createThought ({body}, res) {
    Thought.create(body)
    .then(dbThoughtdata => {
       return User.findOneAndUpdate(
       { _id: body.userId },
       { $push: { thoughts: dbThoughtdata._id }},
       { new: true }
     )
     .then(dbThoughtData => res.json(dbThoughtData))
     .catch(err => res.status(400).json(err));
    })        
},   
// updateing a thought here by using the thought ID
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
    .then(dbThoughtdata => {
        if(!dbThoughtdata) {
            res.status(404).json({ message: 'No Thought with that ID'});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err => res.status(400).json(err));
},
// deleting a thought here by using the Thought ID
deleteThought({ params}, res) {
    Thought.findOneAndDelete({ _id: params.id})
    .then(dbThoughtdata =>  {
        if (!dbThoughtdata) {
        res.status(404).json({ message: 'No Thought with that ID!'});
        return;
      }
      res.json(dbThoughtdata)
    })
    .catch(err => res.status(400).json(err));
  },
    // add reaction to a thought
    addReaction({ params , body}, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body  } },
            { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No Thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.json(err));     
},   
    // deleting reaction from a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId}}},
        { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No Thought with that ID"});
              return;
            }
            res.json(dbThoughtData)
          })
          .catch(err => res.json(err));
          },
};





module.exports = ThoughtController;