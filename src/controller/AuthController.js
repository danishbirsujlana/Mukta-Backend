const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { blacklistModel } = require('../model/Blacklist');
const { customerModel } = require('../model/Customer');
const CONFIG = require('../config');

function generateOTP() {
    return 111111; Math.floor(1000 + Math.random() * 9000);
}
const otpStore = {
};

const loginUser = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({
            message: 'Phone number is required.',
        });
    }
    const phoneRegex = /^\d{10}$/;
    const isValidPhoneNumber = phoneRegex.test(phoneNumber);
    if (!isValidPhoneNumber) {
        return res.status(400).json({
            message: 'Invalid phone number',
        });
    }
    const otp = generateOTP();
    otpStore[phoneNumber] = otp;
    res.status(200).json({ message: 'OTP sent successfully' });
};

const VerifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({
                message: 'Fields not provided',
            });
        }
        if (otpStore[phoneNumber] && otpStore[phoneNumber] == otp) {
            let user;
            if (phoneNumber) {
                user = await customerModel.findOne({ phone: phoneNumber });
            }
            if (user == null) {
                user = new customerModel();
                if (phoneNumber) {
                    user.phone = phoneNumber;
                }
            }
            await user.save();
            let sendObject = {
                _id: user._id.toString(),
                profileComplete: user.profileComplete
            };
            let token = generateToken(sendObject, 'accessToken');
            sendObject.accessToken = token;
            if (phoneNumber)
                delete otpStore[phoneNumber];

            res.status(200).json(sendObject);
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const isNull = (val) => {
    if (val == null || val == 'null' || val == '' || val == undefined || val == 'undefined')
        return true;
    if (val == "false" || val === false)
        return true
    return false;
}

const generateToken = (userInfo, type = 'accessToken') => {
    return jwt.sign(userInfo, CONFIG.JWT_SECRET, {
        expiresIn: CONFIG.JWT_EXPIRY,
    });
};

const logOut = async (req, res) => {
    try {
        let token = '';
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                error: 'Invalid Token',
            });
        }
        const blackList = new blacklistModel({
            token: token
        })
        await blackList.save()
        res.status(200).json({
            message: 'Successfully Logged Out',
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    isNull,
    loginUser,
    VerifyOtp,
    logOut
}