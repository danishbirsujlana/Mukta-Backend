const jwt = require('jsonwebtoken')
const CONFIG = require('../config');
const { customerModel } = require('../model/Customer');
const { blacklistModel } = require('../model/Blacklist');

const verifyToken = async (req, res, next) => {
    try {
        let token = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                error: 'Token not found',
            });
        }
        const blacktoken = await blacklistModel.findOne({ token: token })
        if (blacktoken != null) {
            return res.status(401).json({
                error: 'Invalid authorization token',
            });
        }
        let secret = CONFIG.JWT_SECRET;
        const { _id, role } = jwt.verify(token, secret);
        if (!_id) {
            return res.status(401).json({
                error: 'Not authorized',
            });
        } else {
            let user = await customerModel.findOne({ _id });
            let foundIndex = -1
            if (!user || foundIndex >= 0) {
                return res.status(401).json({
                    error: 'Not authorized',
                });
            }
            res.locals.user = user;
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    verifyToken,
}