const {Comment} = require('../models');

const commentData = [
    {
        content: "Great Post!",
        blog_id: 1,
        user_id: 2,
    },
    {
        content: "Could not agree more",
        blog_id: 2,
        user_id: 1,
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment