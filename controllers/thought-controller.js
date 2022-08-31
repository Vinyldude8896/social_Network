const { Thought } = require('../models');
const { User } = require('../models');
const { param } = require('../routes/api');

const ThoughtController = {

// get all thoughts
getAllThoughts(req, res) {
    Thought.find({})
.select('-__v')
.sort({ _id: -1})
.then(dbThoughtdata => res.json(dbThoughtdata))
.catch(err => {
    console.log(err);
    res.status(400).json(err);
});
},
getThoughtById({ params}, res) {
    Thought.findOne({ _id: params.id})
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
createThought ({body}, res) {
       Thought.create(body)
       .then(dbThoughtData => res.json(dbThoughtData))
    //    .then(dbThoughtdata => {
    //     User.addThought(dbThoughtdata)
    //    })
       .catch(err => res.status(400).json(err));
},   
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
};




module.exports = ThoughtController;