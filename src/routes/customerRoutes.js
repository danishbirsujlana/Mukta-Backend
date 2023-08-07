const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { profilepicUpload } = require('../middleware/multer');
const { getCustomerById, editCustomer, accountSetup } = require('../controller/CustomerController');
const router2 = express.Router();

router2.post("/customer/accountsetup", verifyToken, profilepicUpload, accountSetup);
router2.get("/customer/details", verifyToken, getCustomerById);
router2.post("/customer/edit", verifyToken, profilepicUpload, editCustomer);

module.exports = router2;