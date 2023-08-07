const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const thumbnailUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
}).single('thumbnail');

const profilepicUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
}).single('profileImage');

const upload = multer({ storage: storage });

module.exports = {
  thumbnailUpload,
  profilepicUpload,
  upload
}