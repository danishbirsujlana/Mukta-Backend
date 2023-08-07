const jwt = require('jsonwebtoken');
const { customerModel } = require('../model/Customer');
const {isNull} = require('./AuthController')
const CONFIG = require('../config');

const getCustomerById = async (req, res) => {
    try {
        let token = '';
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
        const id = decodedToken._id;
        const customer = await customerModel.findById(id);
        res.status(200).json(customer);
    } catch (error) {
        console.log(error);
    }
};

const editCustomer = async (req, res) => {
    try {
        let token = '';
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        const id = decodedToken._id;
        const newUser = await customerModel.findById(id);

        const { email, name, gender, countryCode, phone, address } = req.body;
        let pic = "";
        if (!isNull(req.file)) {
            pic = `${req.file?.filename}`
        }
        if (!isNull(email)) {
            newUser.email = email;
        }
        if (!isNull(name)) {
            newUser.name = name;
        }
        if (!isNull(gender)) {
            newUser.gender = gender;
        }
        if (!isNull(countryCode)) {
            newUser.countryCode = countryCode;
        }
        if (!isNull(phone)) {
            newUser.phone = phone;
        }
        if (!isNull(address)) {
            newUser.address = JSON.parse(address);
        }
        newUser.profileImage = pic;
        await newUser.save();
        res.status(200).json({
            message: 'Customer Updated',
        });
    } catch (error) {
        console.log(error);
    }
};

const accountSetup = async (req, res) => {
    try {
        let token = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
        const _id = decodedToken._id;

        const user = await customerModel.findById(_id);
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        if (!req.body?.name || !req.body?.gender) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }
        if (!isNull(req.body?.name)) {
            user.name = req.body?.name;
        }
        if (!isNull(req.body?.email)) {
            user.email = req.body?.email;
        }
        if (!isNull(req.body?.gender)) {
            user.gender = req.body?.gender;
        }
        if (!isNull(req.body?.address)) {
            user.address = JSON.parse(req.body?.address);
        }
        if (!isNull(req.file?.filename)) {
            user.profileImage = `uploads/${req.file?.filename?.trim()}`;
        }
        user.profileComplete = true;
        await user.save();
        return res.json({ message: 'User details updated successfully.' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Error saving personal details.' });
    }
}

module.exports = {
    getCustomerById,
    editCustomer,
    accountSetup,
}