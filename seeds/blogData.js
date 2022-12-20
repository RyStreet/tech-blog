const {Blog} = require('../models');

const blogData = [
    {
        title: 'Model View Controller is the best',
        content: "I wrote this blog's code using MVC",
        user_id: 0
    },
    {
        title: "Is santa real",
        content: "Everyone is trying to convince me he's not real, but he's literally sitting in the middle of the mall so idk",
        user_id: 1
    }
]

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;