import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import config from '../config/config';
import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
    accessKeyId: config.amazon.accessKeyId,
    secretAccessKey: config.amazon.secretAccessKey
})



const storage = multer.diskStorage({
    destination: 'temporal',
    filename: (req, file, cb) => {
        const nameFile = nanoid() + path.extname(file.originalname);
        cb(null, nameFile);
        // amazon s3
        const dirFile = "./temporal/" + nameFile;
        const pathReady = path.resolve(dirFile)
        fs.readFile(pathReady, (err, data) => {
            if (err) throw err;
            const bucket = {
                Bucket: `${config.amazon.bucket}/contentProject`,
                Key: nameFile,
                Body: data
            }
            s3.putObject(bucket, (err, data) => {
                if (err) throw err;
                console.log(data);
            })
        });
    }
})

export default multer({ storage });
