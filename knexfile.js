// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 8100,
      database: "notes-data",
      user: "postgres",
      password: process.env.DB_DEV_PASSWORD
    },
    useNullAsDefault: true,

    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
