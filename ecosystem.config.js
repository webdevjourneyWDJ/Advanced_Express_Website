// The purpose of this file is covered in CH 05, Video 06
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
        // Multi host is possible, just by passing IPs/hostname as an array
        "host" : "54.161.66.106",
        // Branch
        "ref"  : "origin/master",
        // Git repository to clone
        "repo" : "https://github.com/webdevjourneyWDJ/Advanced_Express_Website.git",
        // Path of the application on target servers
        "path" : "/home/ubuntu/apps",
        // Commands to be executed on the server after the repo has been cloned
        "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production",
    },
  },
};
