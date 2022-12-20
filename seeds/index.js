const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedComment = require('./commentData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedBlog();
    await seedComment();
    await seedUser();

    process.exit(0);
};

seedAll();
