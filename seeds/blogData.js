const {Blog} = require('../models');

const blogData = [
    {
        title: 'Model View Controller is the best',
        content: "I wrote this blog code using MVC",
        user_id: 1
    },
    {
        title: "Is santa real",
        content: "Everyone is trying to convince me santa is not real, but he literally sitting in the middle of the mall so idk",
        user_id: 2
    }
]

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;