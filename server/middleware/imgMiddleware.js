const multer = require('multer')
const path = require('path')
const pathToImages = path.resolve(__dirname, '../images')
const cloudinary = require('cloudinary').v2 
const {CloudinaryStorage} = require('multer-storage-cloudinary')
require("dotenv").config();

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET
}) 

const storage = new CloudinaryStorage ({
   cloudinary: cloudinary,
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
         null,
         file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
   },
});

const upload = multer({ storage: storage });

const distStorage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, pathToImages);
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
   },
});

const uploadToDisk = multer({ storage: distStorage });


module.exports = { upload, uploadToDisk };