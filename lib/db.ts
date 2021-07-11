import knex from 'knex';

export const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    supportBigNumbers: true, // Fix problem with ETH and Decimal returned as float
    bigNumberStrings: true, // Fix problem with ETH and Decimal returned as float
  },
});
