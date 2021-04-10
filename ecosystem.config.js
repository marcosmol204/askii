module.exports = {
  apps: [{
    name: 'app',
    script: './src/index.js',
    watch: true,
    instances: 'max',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
