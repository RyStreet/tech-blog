const {Comment} = require('../models');

const commentData = [
    {
        content: "Great Post!",
        user_id: 0,
        blog_id: 0
    },
    {
        content: "Couldn't agree more",
        user_id: 0,
        blog_id: 0

    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment