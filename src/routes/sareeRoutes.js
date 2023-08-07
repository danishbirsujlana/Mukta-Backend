const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { thumbnailUpload } = require('../middleware/multer');
const { uploadSaree, getSareeById, editSareeDetail } = require('../controller/SareeController');
const router1 = express.Router();

router1.post("/saree/upload", verifyToken, thumbnailUpload, uploadSaree);
router1.get("/saree/details/:id", verifyToken, getSareeById);
router1.post("/saree/edit", verifyToken, thumbnailUpload, editSareeDetail);

module.exports = router1;