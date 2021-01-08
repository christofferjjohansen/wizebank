'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      CREATE TABLE users (
        id uuid unique not null DEFAULT tuid_generate() primary key,
        first_name varchar,
        last_name varchar,
        email varchar unique not null,
        created_at timestamptz default now()
      );

      create unique index idx_user_uuid on users(id);
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      DROP TABLE users;
    `)
  }
};
