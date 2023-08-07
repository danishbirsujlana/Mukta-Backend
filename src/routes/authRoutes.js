const express = require('express')
const fs = require('fs')
const { logOut, loginUser, VerifyOtp } = require('../controller/AuthController');
const { profilepicUpload } = require('../middleware/multer');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post("/customer/login", loginUser);
router.post("/customer/verifyotp", VerifyOtp);
router.get("/customer/logout", verifyToken, logOut);
router.get(["/uploads/:var"], (req, res) => {
    if (!fs.existsSync(`.${req.path}`)) {
        res.send()
    }
    else {
        let file = fs.readFileSync(`.${req.path}`);
        res.setHeader('Content-Length', file.length);
        res.setHeader('Content-type', 'image/jpeg');
        res.write(file, 'binary');
        res.end();
    }
}
)

module.exports = router;