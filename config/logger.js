import createLogger from 'winston';
import transports from 'winston';
import format from 'winston';

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine()
        })
    ]
})

export default module.exports = logger;