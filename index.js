const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const CONFIG = require('./src/config');
const corsOptions = {
    origin: '*',
    methods: 'OPTIONS,GET,PUT,POST,PATCH,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};
app.use(cors(corsOptions));
const router = require('./src/routes/authRoutes');
const router1 = require('./src/routes/sareeRoutes');
const router2 = require('./src/routes/customerRoutes');

app.use(express.json());

app.use('/api/auth', router);
app.use('/api', router1);
app.use('/api', router2);

const connectToDB = async () => {
    try {
        await mongoose.connect(`${CONFIG.DB_URL}`);
        console.log("DB connected")
    } catch (err) {
        console.log(err);
    }
};
connectToDB();

app.listen(CONFIG.PORT, () => {
    console.log("server is on", CONFIG.PORT)
})