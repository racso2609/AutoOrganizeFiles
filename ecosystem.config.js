module.exports = {
  apps: [
    {
      script: 'index.js',
      name: 'fileOrganizer',
      cron_restart: '* * * * *',
    },
  ],
};
