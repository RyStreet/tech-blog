const router = require('express').Router();
const userRoutes = require('./user-routes');
const commentRoutes = require('./comments-routes');
const blogRoutes = require('./comments-routes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes)

module.exports = router;