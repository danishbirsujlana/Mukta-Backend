const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    customer_id: { type: String },
    msg: { type: String },
    at: { type: Number, default: Math.floor(new Date().getTime() / 1000) },
    /**
     * 1. product update from wishlist
     * 2. order status change
     * 3. account
     * 4. delivery
     */
    type: { type: Number },

})

module.exports = mongoose.model('Notifications', notificationSchema)