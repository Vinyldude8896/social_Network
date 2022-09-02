const router = require('express').Router();
const userRoutes = require ('./user-routes.js');
const thoughtRoutes = require('./thought-routes');


// telling router to use /users and /thoughts roughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;