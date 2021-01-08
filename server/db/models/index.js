import Sequelize from 'sequelize';
import dbConfig from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env]
const sequelize = config.use_env_variable ? 
  new Sequelize(process.env[config.use_env_variable], config) :
  new Sequelize(config.database, config.username, config.password, config);

export default sequelize;