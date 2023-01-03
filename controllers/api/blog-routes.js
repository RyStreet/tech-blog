const router = require('express').Router();
const {Blog} = require('../../models')

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

router.get('/', async (req, res) => {
    try{
      const allBlogs = await Blog.findAll({
      })
      res.json(allBlogs)
    } catch(err){
      res.status(500).json(err)
    }
  });

module.exports = router