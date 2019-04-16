const app_root = require('app-root-path');
const { createLogger, format, transports } = require('winston');


var logger = createLogger({
	level: 'info',
	format: format.combine(
		format(function(info, opts){
			//
			//If logs wanted to be seen in the console too
			//the comment symbols can be changed to uncomment
			//
			//console.log(`[${info.IP}]-[${info.Date}]-[${info.Path}]-[${info.Data}]`);
			return info;
		})(),
		format.json()

	),

	transports: [
		new transports.File({filename: `${app_root}/logs/info.log`})
	]
});

module.exports = logger;

