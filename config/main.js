/** General Configurations Like PORT, HOST names and etc... */

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8001,
  karmaPort: 9876,
};

module.exports = config;
