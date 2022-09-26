const AWS = require('aws-sdk')
const fs = require('fs')
require('dotenv').config()

const BUCKET = process.env.BUCKET
const REGION = process.env.REGION
const ACCESS_KEY = process.env.AWS_ACCESS_KEY
const SECRET_KEY = process.env.AWS_SECRET_KEY

const localImage = './images/cat.jpg'
const imageRemoteName = `directUpload_catImage_${new Date().getTime()}.jpeg`

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
})

var s3 = new AWS.S3()

s3.putObject({
  Bucket: BUCKET,
  Body: fs.readFileSync(localImage),
  Key: imageRemoteName,
})
  .promise()
  .then((res) => {
    console.log(`Upload succeeded - `, res)
  })
  .catch((err) => {
    console.log('Upload failed:', err)
  })
