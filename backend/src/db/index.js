const pg = require("pg");

const client = new pg.Client({
  host: process.env.PGHOST,
  name: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

client
  .connect()
  .then((db) => {
    db.query('SELECT * FROM topics;')
      .then(data => console.log(data))
      .catch(err => console.log(err))
  })
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
