const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({ //bildiğimiz model..
    name: {
        type: String,
        required: true,
        trim: true, //kullanıcı girişindeki boşlukların otomatik kırpılması
    },
    email: {
        type: String,
        required: true,
        trim: true, //kullanıcı girişindeki boşlukların otomatik kırpılması
    },
    balance: {
        type: Number,
        default: 0,
    }
})

CustomerSchema.plugin(timestamp);

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;