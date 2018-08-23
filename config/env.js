'use strict';

module.exports = {
  port: process.env.PORT || 5000,
  mongourl: process.env.DB_URL || `mongodb://localhost/daybook`,
}
