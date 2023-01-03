const router = require('express').Router();
const { Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

router.get('/', async (req, res) => {
  try{
    const allComments = await Comment.findAll({
    })
    res.json(allComments)
  } catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) =>{
  try{
    const singleComment = await Comment.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(singleComment)
  } catch(err){
    res.status(500).json(err)
  }
})


router.post('/', async (req, res) =>{
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id

        });
        res.status(200).json(newComment);
    } catch(err){
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) =>{
  try{
  const deleteComment = await Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({message: 'Comment Deleted'})
}catch{
res.status(400).json(err)
}
})

module.exports = router