## Modified Amazon s3 upload for PDF filetype.

This is modified from Brennon Schow's Amazon S3 image upload repo. 

The difference for pdf vs image ended up depending on the Buffer.

In the image upload, the req.body.file  comes through having a line with "data:image/jpeg" or "data:image/png"; in the case of the PDF,it was "data:application/pdf". So, we changed the line from:

```
//Image upload - img = req.body
buf = new Buffer(img.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
```

to 

```
//PDF upload pdf = req.body
buf = new Buffer(pdf.file.replace(/^data:application\/\w+;base64,/, ""), 'base64'),
```

Quick, easy, and easy to fix for multiple files - just make sure to replace the right info. Console log if you need to see what the file is reading, or you could generalize it.