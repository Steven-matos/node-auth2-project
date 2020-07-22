const knex = require("knex");

const knexConfig = require("../knexfile");

const enviorment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[enviorment]);
