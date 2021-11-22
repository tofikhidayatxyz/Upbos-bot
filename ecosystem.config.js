module.exports = {
  apps: [
    {
      name: 'upwork-bot',
      script: './index.js',
      instances: 1,
      autorestart: true,
      exec_mode: 'fork',
      watch: false,
      exp_backoff_restart_delay: 100,
      ignore_watch: ['logs', 'node_modules'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
