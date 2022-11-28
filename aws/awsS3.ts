// @ts-nocheck
import S3Client from "aws-sdk/clients/s3"
import "dotenv/config"
import fs from "fs"

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3client = new S3Client({
    region,
    credentials:{
        accessKeyId,
        secretAccessKey
    }
})

export const uploadFile = (file) =>{
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3client.upload(uploadParams).promise()
}

export const downloadFile = (fileKey) =>{
    const downloadParams = {
        Key:fileKey,
        Bucket:bucketName 
    }
    return s3client.getObject(downloadParams).createReadStream()
}