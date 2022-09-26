const cors = require('cors')
const aws = require('aws-sdk')
const express = require('express')
require('dotenv').config()

const app = express()
app.use(cors())
app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3()
  const fileName = removeDiacritics(req.query['file-name'])
  console.log(fileName)
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: process.env.BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  }

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(`getSignedUrl error: `, err)
      return res.end()
    }
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.BUCKET}.s3.amazonaws.com/${fileName}`,
    }
    res.write(JSON.stringify(returnData))
    res.end()
  })
})

const removeDiacritics = (string) => {
  let output = ''
  let normalized = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  console.log(normalized)
  // let i = 0
  // let j = 0
  // while (i < string.length) {
  //   output += normalized[j]
  //   j += string[i] == normalized[j] ? 1 : 2
  //   i++
  // }
  // return output.split(' ').join('+')
}

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

app.listen(port, () => console.log(`Listening: http://${host}:${port}`))
