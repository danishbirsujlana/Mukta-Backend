const { model, Schema } = require('mongoose');

const wishlistSchema = new Schema({
    customer_id: { type: String, required: false },
    sarees: { type: [String], required: false },
    updatedAt: { type: Number, required: false, default: Math.floor(new Date().getTime() / 1000) },
});

const wishlistModel = model('Wishlist', wishlistSchema);
module.exports = {
    wishlistModel,
};
