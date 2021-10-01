const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config')

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

    // Auth User
    server.post('/auth', async => (req, res, next) => {
        const { email, password } = req.body;

        try {
            // Authenticate User
            const user = await auth.authenticate(email, password);
            //auth.authenticate => promise döndürüyor. Bu yüzden await kullandık. await olmasa .then .then

            // Create JWT
            // jwt.sign'a istediğini verebilirsin.
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m',
            });

            const { iat, exp } = jwt.decode(token); //token'i çöz. içindeki expiration ve iat'i al.
            //iat => tam olarak bilemedim.. exp: expiration => tokenin geçerlilik süresi.

            // Respond with token 
            res.send({ iat, exp, token });

            next(); //sonraki route'a geçmesi için
        } catch (err) {
            // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    })
}