const Minio = require('minio');
require('dotenv').config();

let bucketName = process.env.MINIO_BUCKET;
let minioAccessKey = process.env.MINIO_ACCESS_KEY;
let minioSecretKey = process.env.MINIO_SECRET_KEY;
let port = process.env.MINIO_PORT;

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: port,
    useSSL: false,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey
});

const getObject = (objectName) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject(bucketName, objectName, (err, dataStream) => {
            if (err) {
                return reject(err);
            }

            let chunks = [];
            dataStream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            dataStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer); 
            });

            dataStream.on('error', (err) => {
                reject(err);
            });
        });
    });
};


//putObject(bucketName, objectName, stream, size, metaData[, callback])

//getObject(bucketName, objectName, stream, size, metaData);

module.exports = minioClient;