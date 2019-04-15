var app_root = require('app-root-path');
var { createLogger, format, transports } = require('winston');

var options = {
	file : {
		level: 'info',
		filename: `${app_root}/logs/info.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880,
		maxFiles: 5,
		colorize: false,
	},

	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true
	},
};

var logger = createLogger({
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),

		format.simple()
	),
	transports: [
		new transports.File(options.file),
		new transports.File({level:'error', filename: `${app_root}/logs/info.log`}),
		new transports.Console(options.console)
	],

	exitOnError: false,
});

module.exports = logger;