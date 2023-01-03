const router = require('express').Router();
const { Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

router.post('/', async (req, res) =>{
    try {
        const newComment = await Comment.create({
            ...req.body.content,
            ...req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newComment);
    } catch(err){
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try{
      const allComments = await Comment.findAll({
      })
      res.json(allComments)
    } catch(err){
      res.status(500).json(err)
    }
  });

module.exports = router