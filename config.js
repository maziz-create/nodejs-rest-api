module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '3000',
    URL: process.env.BASE_URL || 'http://localhost:3000',
    // MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://00aziz:3363217433@customers-api.tsoko.mongodb.net/customers-api?retryWrites=true&w=majority'
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1', // secrete verilen değer önemsiz.
}