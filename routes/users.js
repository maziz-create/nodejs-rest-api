const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = server => {
    //Register User
    server.post('/register', (req, res, next) => {
        const { email, password } = req.body; //yapılan isteğin body kısmında email ve password, JSON formatında tanımlanmış olacak, onları alacağız. 

        const user = new User({
            // email: email,
            // password: password,
            email,
            password,
        })

        //kullanıcının şifresi hash'lenerek db'e kaydedilecek.
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                //Hash password
                user.password = hash;
                //Save User

                try {
                    const newUser = await user.save(); //async-await kullanmazsan burada save().then.. diye gidip sorun çıkarsa yakalamalısın.
                    res.send(201); //işlem başarılı ve bir kayıt üretildi.
                    next(); //diğer recordlara geçmesi için
                } catch (error) {
                    return next(new errors.InternalError(err.message));

                }
            })
        })
    })
}