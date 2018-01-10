require('dotenv').config()

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express(),
      S3_PDF = require('./s3pdf'),
      port = process.env.PORT


//========= Top-Level Middleware =========//
// app.use(bodyParser.json())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(cors())


//========= Amazon S3 =========//
S3_PDF(app)