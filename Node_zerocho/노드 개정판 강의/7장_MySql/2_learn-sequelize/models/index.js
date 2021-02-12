const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// 이렇게 하면 외부파일에서 const {sequelize} = require('./models'); 로 빼올 수 있다.
module.exports = db; 