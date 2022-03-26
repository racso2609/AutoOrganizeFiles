const config = require('./config.json');

const timestamp = config.timeStamp || '*/30 * * * * *';
module.exports = {
  apps: [
    {
      script: 'index.js',
      name: 'fileOrganizer',
      cron_restart: timestamp,
    },
  ],
};
