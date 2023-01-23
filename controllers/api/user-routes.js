const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)



router.get('/', async (req, res) => {
  try{
    const allUsers = await User.findAll({
      attributes: {exclude: ['password']},
      include: [
        {
          model: Blog,
          attributes: ['id', 'title', 'content', 'user_id']
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'blog_id']
        }
      ]
    });
    res.json(allUsers)
  } catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const singleUser = await User.findOne({
      where:{
        id: req.params.id
      },
      attributes: {exclude: ['password']},
      include:[
        {
          model: Blog,
          attributes: ['id', 'title', 'content', 'user_id']
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'blog_id'],
        }
      ]
    })
    res.json(singleUser)
  } catch (err){
    res.status(400).json(err)
  }
});



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

router.post('/auth/login', async (req, res) =>{
  try{
    const userLogin = await User.findOne({
      where: {email: req.body.email}
    });
    console.log("The User ID is:", userLogin.id)

    if(!userLogin){
      res.status(400).json({message: 'No Email or Password Found'})
      return;
    }

    const validPW = await userLogin.checkPassword(req.body.password)
    
    if(!validPW){
      res.status(400).json({message: 'Incorrect Email or Password'})
    return;
    }

    req.session.save(()=>{
      req.session.user_id = userLogin.id;
      req.session.email = userLogin.email;
      req.session.logged_in = true;
      console.log('User Login:', userLogin)
      res.json({user: userLogin, message: 'Welcome Back!'})
    })
  }catch(err){
    res.status(400).json(err)
  }
})

router.post('/auth/logout', (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  }  else{
    res.status(404).end()
  }
});

router.put('/:id', async (req, res) => {

  try{ 
    const updateUser = User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    },
  });
  res.json(updateUser)
} catch{
  res.status(500).json(err)
}
})

module.exports = router