// config/winston.js

const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');
const logDir = `${__dirname}/logs`; // '../logs'; //로그파일 저장 경로

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  //const env = process.env.LOG_LEVEL || 'info'
  const isDevelopment = env === 'development';
  //const isInfo = env === 'info'
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: ' YYYY-MM-DD HH:MM:SS ||' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`)
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format,
  level: level(),
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      filename: `%DATE%.log`,
      zippedArchive: false,
      handleExceptions: true,
      maxFiles: 3, // 보관일. 3이면 3일, 30이면 30일.
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      zippedArchive: false,
      maxFiles: 3, // 보관일. 3이면 3일, 30이면 30일.
    }),
    new winston.transports.Console({
      handleExceptions: true,
      colorize: true,
    }),
  ],
});

module.exports = logger;