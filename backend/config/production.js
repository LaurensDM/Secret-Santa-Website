module.exports = {
  port: 9000,
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://frontendweb-secretsanta.onrender.com'],
    maxAge: 3 * 60 * 60, // 3h in seconds
  },
  database: {
    client: 'mysql2',
    host: 'jorisduyse.com',
    port: 3306,
    name: 'secretsanta',
  },
};
