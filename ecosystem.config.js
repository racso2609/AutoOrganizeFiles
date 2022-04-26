const config = require('./config.json');
const timestamp = config.timeStamp || '*/30 * * * * *';
const path = require('path');

module.exports = {
  apps: [
    {
      script: path.join(__dirname, 'index.js'),
      name: 'fileOrganizer',
      cron_restart: timestamp,
    },
  ],
};
