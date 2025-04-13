// cloudinaryUpload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const express = require('express');
const router = express.Router();
const upload = require('./cloudinaryUpload');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your-app-folder', // optional folder in your Cloudinary media library
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  },
});

const upload = multer({ storage: storage });


router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.path; // this is the public URL from Cloudinary
    // save imageUrl in MongoDB or wherever
    res.json({ success: true, imageUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
