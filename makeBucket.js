const AWS = require('aws-sdk')
require('dotenv').config()

const REGION = process.env.REGION
const ACCESS_KEY = process.env.AWS_ACCESS_KEY
const SECRET_KEY = process.env.AWS_SECRET_KEY

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
})

var s3 = new AWS.S3()

const params = {
  Bucket: config.BUCKET,
}

const editBucketCORS = () =>
  s3.putBucketCors(
    {
      Bucket: config.BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['PUT', 'POST', 'DELETE'],
            AllowedOrigins: ['*'],
          },
          {
            AllowedMethods: ['GET'],
            AllowedOrigins: ['*'],
          },
        ],
      },
    },
    (err) => {
      if (err) console.log(err, err.stack)
      else console.log(`Edit Bucket CORS succeed!`)
    }
  )

s3.createBucket(params, (err, data) => {
  if (err) console.log(err, err.stack)
  else {
    console.log(data)
    editBucketCORS()
  }
})
