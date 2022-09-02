const router = require('express').Router();

// importing all the user functions from the user-controller
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
.post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
  router
  .route('/:userId/friends/:friendId')
  .put(addFriend)
  .delete(deleteFriend)

module.exports = router;