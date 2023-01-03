const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store)



router.get('/', async (req, res) => {
  try{
    const allUsers = await User.findAll({
      attributes: {exclude: ['password']}
    })
    res.json(allUsers)
  } catch(err){
    res.status(500).json(err)
  }
})



router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router