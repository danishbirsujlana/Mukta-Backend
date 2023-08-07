const CONFIG = {
    DB_URL: process.env.DB_CONNECTION,
    PORT: process.env.PORT || 2020,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
};
module.exports = CONFIG;