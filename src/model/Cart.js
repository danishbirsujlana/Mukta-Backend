const { model, Schema } = require('mongoose');

const sareeModel = new Schema({
    saree_id: { type: String, required: false },
    count: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema({
    customer_id: { type: String, required: false },
    sarees: { type: [sareeModel], required: false },
    updatedAt: { type: Number, required: false, default: Math.floor(new Date().getTime() / 1000) },
});

const cartModel = model('Cart', cartSchema);
module.exports = {
    cartModel,
};
