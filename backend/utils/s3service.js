import { S3 } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk'


 const s3Uploadv2 = async (file) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
    });

    const param = {
        Bucket:process.env.AWS_BUCKET_NAME,
        Key : `uploadsfile/${Date.now()}-${file.originalname}`,
        Body: file.buffer
    }
    const result = await s3.upload(param).promise();
    return result
}

export {s3Uploadv2}