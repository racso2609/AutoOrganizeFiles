const config = require('./config.json');
module.exports = {
  apps: [
    {
      script: 'index.js',
      name: 'fileOrganizer',
      cron_restart: config.timeStamp,
    },
  ],
};
