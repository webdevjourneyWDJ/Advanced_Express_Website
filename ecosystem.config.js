module.exports = {
  apps: [
    {
      name: 'meetup',
      script: 'bin/www',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    "production" : {
        "user" : "ubuntu",
        "host" : "54.161.66.106",
        "ref"  : "origin/master",
        "repo" : "https://github.com/webdevjourneyWDJ/Advanced_Express_Website.git",
        "path" : "/home/ubuntu/apps",
        "pre-setup" : "apt-get install git",
        "pre-deploy-local" : "echo 'This is a local executed command'",
        "post-deploy" : "cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
  },
};
