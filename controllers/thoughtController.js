const { Thought, User } = require("../models");

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thought by _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Post new Thought
  createThought(req, res) {
    // create new thought
    Thought.create(req.body)
      // then, pass in new thought, find user and update thought array and res with new thought
      .then((thought) => {
        // find and update user thought's array
        console.log(req.body.userId);
        console.log(thought._id);
        User.findOneAndUpdate(
          // find the user by the userId in the req
          { _id: req.body.userId },
          // add the new thought id to the user's "thoughts" array
          { $push: { thoughts: thought._id } },
          // validate? return updated document
          { new: true }
        ).then((thought) => res.json(thought));
      })
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json({ message: "Thought deleted" });
      })
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    // create a reaction const to update thought? Data is already stored in req tho...
    // req includes: thoughtId, reactionBody (text), username
    // findOneAndUpdate thought
    // then, take reaction, find thought array of thought _id, update thought array with addtoset/push of reaction _id
    // catch errors
  },
  // end of exports
};

/*
/api/thoughts/:thoughtId/reactions
- [ ] post to create a reaction stored in a single thought’s reactions array field
- [ ] delete to pull and remove a reaction by reactionId value 
*/
