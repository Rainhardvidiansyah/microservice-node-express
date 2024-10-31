const minioClient  = require('../service/minioservice');
require('dotenv').config();

class MinioController{
    


    constructor(){
        
    this.bucketName = process.env.MINIO_BUCKET;
    }

    async getObject(req, res){
        try {
            const objectName = req.params.objectName;
            const stream = await minioClient.getObject(process.env.MINIO_BUCKET, objectName);
            console.log('MINIO CONTROLLER TO GET DATA IS HIT');
            res.setHeader('Content-Type', 'application/octet-stream');
            res.setHeader('Content-Disposition', `attachment; filename="${objectName}"`);
            stream.pipe(res);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving object from MinIO');
        }
    }
}

module.exports = new MinioController();