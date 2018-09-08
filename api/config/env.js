'use strict';

module.exports = {
  port: process.env.PORT || 5000,
  mongourl: process.env.DB_URL || `mongodb://localhost/daybook`,
  defaultUrl: process.env.URL || 'localhost',
  secret: process.env.secret || 'dev',
  name: process.env.name || 'dev',
  jwtSecret: process.env.jwtSecret || 'dev',
}
