const router = require('express').Router();
const {Blog, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
    try{
      const allBlogs = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'blog_id'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      })
      res.json(allBlogs)
    } catch(err){
      res.status(500).json(err)
    }
});


router.get('/:id', async (req, res) => {
  try{
    const singleBlogData = await Blog.findOne({
       where:{
           id: req.params.id
       },
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
})
  res.json(singleBlogData)
   } catch(err) {
       res.status(500).json(err)
};
})



router.post('/', async (req, res) =>{
  try {
      const newBlog = await Blog.create({
          ...req.body.title,
          ...req.body.content,
          user_id: req.session.user_id
      });
      res.status(200).json(newBlog);
  } catch(err){
      res.status(400).json(err);
  }
});
module.exports = router