// routes/upload.js
const express = require('express');
const router = express.Router();
const cloudinary = require('../systemgitconfig/systemconfig');
const uploads = require('../tools/fileUploads');
const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
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


// 


const uploadImage = async function(req, res) {
  const file = req.file?.path;

  if (!file) {
    return apiResponse.sendError(apiErrors.APPLICATION.BAD_REQUEST, 'No file uploaded', 400, res);
  }

  try {
    const fileUploads = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
    console.log("------fileUploads-------", fileUploads);

    const imageUrl = fileUploads.secure_url;
    saveImageToDB(imageUrl);

    return apiResponse.sendSuccess({ imageUrl }, res);
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res);
  }
};

  
  router.post('/image/uploadImage', uploads.single('file'), uploadImage);

module.exports = router;
