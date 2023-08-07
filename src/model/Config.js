const mongoose = require('mongoose')

const ConfigModel = mongoose.Schema({
    iosSoftUpdate: { type: String },
    iosHardUpdate: { type: String },
    androidSoftUpdate: { type: String },
    androidHardUpdate: { type: String },
    playStoreUrl: { type: String },
    appStoreUrl: { type: String },

})

module.exports = mongoose.model('Config', ConfigModel)