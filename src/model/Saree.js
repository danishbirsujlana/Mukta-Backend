const { model, Schema, default: mongoose } = require('mongoose');

const sareeSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    colour: { type: [String], required: false, default: [] },
    /**
     * 1. Tant
     * 2. Tissue
     * 3. Kantha stich
     * 4. Tussar silk
     * 5. Baluchari
     * 6. Kanjivaram
     * 7. Muslin
     * 8. Jamdani
     * 9. Silk
     * 10. Cotton silk
     * 11. Linen
     * 12. Organza
     */
    type: { type: Number, required: true },
    outOfStock: { type: Boolean, required: false, default: false },
    thumbnail: { type: String, required: false },
});
const sareeModel = model('Saree', sareeSchema);
module.exports = {
    sareeModel
};
