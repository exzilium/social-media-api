const { User } = require("../models");

// module exports of object containing "namedFunction(req, res) { Model.method().then.catch" for use in userRoutes
module.exports = {
  // /api/users

  // Get all Users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  // Get a single user by _id with thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json({
              user,
              thoughts,
              friends,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Post new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Put update to User by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : User.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: "User and associated data deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  // /api/users/:userId/friends/:friendId
  // Post to add new friend to User's friend list
  
  // end of exports
};

/*
/api/users
- [ ] get all users
- [ ] get a single user by _id with thought and friend data
- [ ] post a new user (example code in instructions)
- [ ] put update to user by _id
- [ ] delete user by _id
    - [ ] remove a user’s associated thoughts when deleted)
*/

/*
/api/users/:userId/friends/:friendId
- [ ] post to add new friend to user’s friend list
- [ ] delete to remove a friend from user’s friend list
*/
