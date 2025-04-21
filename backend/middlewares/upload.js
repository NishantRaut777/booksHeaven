const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Accepted file extensions
const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg','webp'], // Allowed file types
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg,.png, and .webp files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;