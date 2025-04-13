// routes/upload.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../systemgitconfig/systemconfig');
const upload = require('../tools/fileUploads');

// Replace this with your DB logic
const saveImageToDB = (imageUrl) => {
  console.log("Saved to DB:", imageUrl);
};

// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'images'
//     });

//     const imageUrl = result.secure_url; // You can now store this in DB
//     saveImageToDB(imageUrl);

//     res.json({ success: true, imageUrl });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ success: false, message: "Upload failed" });
//   }
// });


const uploadImage = function(req, res) {
    try {
      const imageUrl = req.file.path;
      res.json({ success: true, imageUrl });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
  router.post('/image/uploadImage', upload.single('file'), uploadImage);

module.exports = router;
