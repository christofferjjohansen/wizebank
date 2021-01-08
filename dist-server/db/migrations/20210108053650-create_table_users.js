'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query("\n      CREATE TABLE users (\n        id uuid unique not null DEFAULT tuid_generate() primary key,\n        first_name varchar,\n        last_name varchar,\n        email varchar unique not null,\n        created_at timestamptz default now()\n      );\n\n      create unique index idx_user_uuid on users(id);\n    ");
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.sequelize.query("\n      DROP TABLE users;\n    ");
  }
};