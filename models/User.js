const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ //bildiğimiz model..
    email: {
        type: String,
        required: true,
        trim: true, //kullanıcı girişindeki boşlukların otomatik kırpılması
    },
    password: {
        type: String,
        required: true,
    }
})

// mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);
module.exports = User;