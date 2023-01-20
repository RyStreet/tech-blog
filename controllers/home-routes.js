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

router.get('/blog/:id', async (req, res) =>{
   try{
     const singleBlogData = await Blog.findOne({
        where:{
            id: req.params.id
        },
        attributes:[
            'id',
            'title',
            'content',
            'user_id'
        ],
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
    const singleBlogPost = singleBlogData.get({plain: true});

    console.log("!!!!!!!!!", "\n" , "\n" ,JSON.stringify(singleBlogPost), "\n" ,)

    res.render('singleBlog', {
        singleBlogPost,
        loggedIn: true
    })
    } catch(err) {
        res.status(500).json(err)
};
});

router.get('/login', (req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req,res) =>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('signup')
});



router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Blog}]
        })
        const userProfile = userData.get({plain: true})
    
        res.render("dashboard", {
            ...userProfile,
            
            loggedIn: true

        })
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;