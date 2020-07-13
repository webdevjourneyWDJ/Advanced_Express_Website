require('dotenv').config();

const bunyan = require('bunyan');
const path = require('path');

const loggers = {
  development: () => bunyan.createLogger({name: "development", level: "debug"}),
  production: () => bunyan.createLogger({name: "production", level: "info"}),
  test: () => bunyan.createLogger({name: "test", level: "fatal"}),
}

module.exports = {
  development: {
    sitename: 'Art Meetups [Development]',
    log: loggers.development,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN,
    },
  },
  production: {
    sitename: 'Art Meetups',
    log: loggers.production,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.PRODUCTION_DB_DSN,
    },
  },
  test: {
    sitename: 'Art Meetups [Test]',
    log: loggers.test,
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback-test.json'),
      avatars: path.join(__dirname, '../data/avatars/test'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
    },
  },
};
