import {Sequelize} from 'sequelize-typescript';
var config = require("./config/config.json")
export const sequelize = new Sequelize(config.development.database,config.development.username,config.development.password,{
  dialect: config.development.dialect,
  database: config.development.database,
  storage: ':memory:',
  models: [__dirname + '/models']
});
