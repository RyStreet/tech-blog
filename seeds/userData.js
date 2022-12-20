const {User} = require('../models');

const userData = [
    {
        username: "BillyTheCoder",
        email: "Billy@gmail.com",
        password: "Varmint99!",
    },
    {
        username: "Johnny5",
        email: "Johnny5is@live.com",
        password: "robotrock01@"
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser