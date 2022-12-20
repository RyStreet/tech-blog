const {Comment} = require('../models');

const commentData = [
    {
        content: "Great Post!",
        blog_id: 1,
    },
    {
        content: "Could not agree more",
        blog_id: 2,
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment