const errors = require('restify-errors'); //hatayı restify-errors ile gönderiyoruz.
const Customer = require('../models/Customer'); //Modelimiz

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

    //Add Customers
    server.post('/customers', async (req, res, next) => {
        //Check for JSON => JSON gönderildiğinden emin olmalısın!
        if (!req.is('application/json')) {
            next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, email, balance } = req.body; //ES6

        const customer = new Customer({
            //Bunları ES6 öncesinde name: name olarak alıyorduk. Artık böyle.
            name,
            email,
            balance,
        });

        try {
            const newCustomer = await customer.save(); //await kullanılmasa birsürü .then, cbFn kullanılacaktı..
            res.send(201); //201: Her şey yolunda ve bir kayıt oluşturuldu.
            next(); //sonraki route'a geçmesi için.
        } catch (error) {
            return next(new errors.InternalError(error.message));
        }
    })
}