const { createLogger, transports, loggers } = require('winston');
const { format } = require('logform');
const { combine, splat, timestamp, printf, simple, colorize } = format;

//Error text format for console
const errorConsoleLogFormat = format.combine(
  colorize({
    all: true
  }),
  timestamp(),
  splat(),
  simple(),
  printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${[timestamp]}: ${level} \n`;
    msg += `\n Name: ${metadata.name}`;
    msg += `\n Message: ${message}`;
    msg += `\n Stack: ${metadata.stack}`;
    msg += "\n";
    return msg;
  })

);

//Error text format for log file
const errorLogFormat = format.combine(
  timestamp(),
  splat(),
  simple(),
  printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${[timestamp]}: ${level} \n`;
    msg += `\n Name: ${metadata.name}`;
    msg += `\n Message: ${message}`;
    msg += `\n Stack: ${metadata.stack}`;
    msg += "\n";
    return msg;
  })
);


//Dev mode text format for console
const devModeConsoleLogFormat = format.combine(
  colorize({
    message: false
  }),
  timestamp(),
  splat(),
  simple(),
  printf(({ level, message, timestamp }) => {
    let msg = `${timestamp} ${level} : ${message} `
    return msg
  }),
);

//Dev mode text format for console
const devModeLogFormat = format.combine(
  timestamp(),
  splat(),
  simple(),
  printf(({ level, message, timestamp }) => {
    let msg = `${timestamp} ${level} : ${message} `
    msg += "\n";
    return msg
  }),
);


const devModeLogger = createLogger({
  level: 'debug',
  transports:  [
    new transports.Console({
      format: devModeConsoleLogFormat
    }),
    new transports.File({
        filename: "logs/devmode.log",
        format: devModeLogFormat
    })],
});

const errorLogger = createLogger({
    level: 'error',
    transports: [
      new transports.Console({
        format: errorConsoleLogFormat
      }),
      new transports.File({
        filename: "logs/error.log",
        format: errorLogFormat
      })
  
    ]
});



module.exports = { errorLogger, devModeLogger };