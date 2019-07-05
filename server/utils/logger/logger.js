/**
* Configurations of logger.
*/
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');
var appRoot = require('app-root-path');

var options = {
    file: {
        name: 'file',
        level: 'info',
        handleExceptions: true,
        datePattern: "YYYYMMDD",
        filename: `${appRoot}/logs/%DATE%-all.log`,
        timestamp: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
    fileError: {
        level: 'error',
        filename: `${appRoot}/logs/%DATE%-exception.log`,
        handleExceptions: true,
        datePattern: 'YYYY-MM-DD',
        timestamp: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    fileAllInfo: {
        name: 'file',
        level: 'info',
        handleExceptions: true,
        datePattern: "YYYYMMDD",
        filename: `${appRoot}/logs/all.log`,
        timestamp: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
}
const consoleConfig = [
    new winston.transports.Console({
        'colorize': true
    })
];


// custom formatter
const { splat, combine, timestamp, printf, json, simple } = winston.format;

// meta param is ensured by splat()
const myFormat = printf(({ timestamp, level, message, meta }) => {
    return `${timestamp};${level};${message};${meta ? JSON.stringify(meta) : ''}`;
});


const createLogger = winston.createLogger({
    // 'transports': consoleConfig,
    transports: [
        new winston.transports.File(options.fileAllInfo),
        new winston.transports.Console(options.console),
        new winstonRotator(options.file)
    ],
    exitOnError: false,
    format: combine(
        timestamp(),
        splat(),
        simple(),
        printf(info => {
            // console.log(info)
            // console.log('info.meta' + info.meta)
            return `${info.timestamp} - [${info.level}] : ${info.message}  ${info.meta ? '| ' + JSON.stringify(info.meta) + ' |' : ''} `;
        })
    ),
});

const successLogger = createLogger;
successLogger.add(new (winstonRotator)({
    'name': 'access-file',
    'level': 'info',
    'filename': `${appRoot}/logs/%DATE%-access.log`,
    'timestamp': true,
    'datePattern': 'YYYY-MM-DD',
    'prepend': true,
    'colorize': true
}));

const errorLogger = createLogger;
errorLogger.add(new (winstonRotator)({
    'name': 'error-file',
    'level': 'error',
    'filename': `${appRoot}/logs/%DATE%-error.log`,
    'timestamp': true,
    'datePattern': 'YYYY-MM-DD',
    'prepend': true,
    'handleExceptions': true,
}));
createLogger.stream = {
    write: (message, encoding) => {
        createLogger.info(message)
    }
}

module.exports = {
    'createlog': createLogger,
    'successlog': successLogger,
    'errorlog': errorLogger
};