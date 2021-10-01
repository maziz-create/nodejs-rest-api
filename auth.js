const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        // istediğimiz gerçekleşirse => resolve, gerçekleşmezse => reject
        try {
            // Get user by email
            const user = await user.findOne({ email });

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user); //return user gibi.
                } else {
                    // Password didn't match
                    reject('Authentication Failed');
                }
            })

        } catch (error) {
            // Email not found.
            reject('Authentication Failed');
        }
    })
}