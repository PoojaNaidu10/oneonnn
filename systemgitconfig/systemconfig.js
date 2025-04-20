const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  

module.exports ={ HOST : '15.206.222.49',//'35.154.17.26',//',//'13.127.160.169',//'15.206.222.49',//'3.111.17.5'
  USER_NAME : '',
  PASSWRORD : '',
  cloudinary:cloudinary}
