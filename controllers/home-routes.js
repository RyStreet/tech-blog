const router = require('express').Router();
const {User, Blog, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) =>{
    try{
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ["id", "content", "user_id", "blog_id"],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });
        const blogPosts = blogData.map((blog)=> blog.get({plain: true}));

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err)
    }
});



module.exports = router;