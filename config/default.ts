
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

const logPath = path.join(__dirname, '../logs/development.log')

export default {
	env: "development",
	host: "localhost",
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    amazon: {
        accesskeyid: process.env.ACCESSKEYID,
        secretaccesskey: process.env.SECRETACCESSKEY,
        bucket: process.env.BUCKET,
        folderuser: process.env.FOLDERUSER,
        folderproject: process.env.FOLDERPROJECT
    },
    logging: {
        state: true,
        config: {
            appenders: { cheese: { type: 'file', filename: logPath } },
            categories: { default: { appenders: ['cheese'], level: 'error' }, info: { appenders: ['cheese'], level: 'info' } }
        }
    }
}