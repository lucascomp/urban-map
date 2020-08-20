const {
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
} = process.env;

const config = {
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  host: PGHOST,
  port: Number(PGPORT),
  dialect: 'postgres',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
