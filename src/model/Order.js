const { model, Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    saree_id: { type: String, required: true },
    saree_count: { type: Number, required: true, default: 1 },
    customer_id: { type: Number, required: true },
    at: { type: Number, required: true, default: Math.floor(new Date().getTime() / 1000) },
    /**
     * 1. ordered
     * 2. out for delivery
     * 3. delivered
     * 4. order cancelled
     */
    status: { type: Number, required: false },
    /**
     * 1. cod
     * 2. payment done
     * 3. payment unsuccessful
     */
    paymentStatus: { type: Number, required: false },
    deliveryTime: { type: Number, required: false },
});
const orderModel = model('Saree', orderSchema);
module.exports = {
    orderModel
};
