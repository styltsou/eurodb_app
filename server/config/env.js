module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  DB_IP: process.env.DB_IP || 'mysql',
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
