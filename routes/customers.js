const errors = require('restify-errors'); //hatayı restify-errors ile gönderiyoruz.
const Customer = require('../models/Customer');

module.exports = server => {
    //Get Customers
    server.get('/customers', async (req, res, next) => { //bu fetch işlemi tüm customers'i dönecek.
        // res.send({ msg: 'test' }); //for testing
        try {
            const customers = await Customer.find({}); //önce customers'in gelmesini bekle sonra değişkene ata.
            //find({}) => collectionda yer alan tüm kayıtları döndür.
            res.send(customers);
            next(); //sonraki route'a geçmesi için.
        } catch (err) {
            next(new errors.InvalidContentError(err));
        }
    });
}