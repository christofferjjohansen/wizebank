"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../config/config.js"));

var env = process.env.NODE_ENV || 'development';
var config = _config["default"][env];
var sequelize = config.use_env_variable ? new _sequelize["default"](process.env[config.use_env_variable], config) : new _sequelize["default"](config.database, config.username, config.password, config);
var _default = sequelize;
exports["default"] = _default;