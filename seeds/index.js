const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedComment = require('./commentData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log('\n----- DATABASE SYNCED -----\n')

    await seedUser()
    console.log('\n----- USERS SEEDED -----\n');
    await seedBlog();
    console.log('\n----- BLOGS SEEDED -----\n');
    await seedComment();
    console.log('\n----- COMMENTS SEEDED -----\n');
    
    

    process.exit(0);
};

seedAll();
