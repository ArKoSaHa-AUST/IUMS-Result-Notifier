module.exports = {
  apps: [
    {
      name: "iums-bot",
      script: "checker.js",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      restart_delay: 5000,
      time: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
