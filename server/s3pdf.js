require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_AUS,
    secretAccessKey: process.env.AWS_SECRET_AUS,
    region: process.env.AWS_REGION_AUS
})

const S3 = new AWS.S3()

function uploadPDF(req, res) {
    // console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY)
    /*
        req.body = {
            file: (base64 encoded image),
            filename: (whatever the photo is called from the user),
            filetype: (file extension, eg. .png)
        }
    */
    
    let pdf = req.body,
    // pdfBuffer = new Buffer(pdf.file),
    buf = new Buffer(pdf.file.replace(/^data:application\/\w+;base64,/, ""), 'base64'),

     params = {
        Bucket: process.env.AWS_S3_BUCKET_AUS,
        Body: buf,
        Key: pdf.filename,
        ContentType: pdf.filetype,
        ACL: 'public-read'
    }
    // console.log(buf)

    S3.upload(params, (err, data) => {
        console.log(err, data)
        let response, code
        err ? (response = err, code = 500) : (response = data, code = 200)
        res.status(code).send(response)
        console.log('S3 response', data)
    })
}

module.exports = function (app) {
    app.post('/api/pdfUpload', uploadPDF)
}