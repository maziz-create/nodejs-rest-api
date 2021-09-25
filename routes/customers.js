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

    //Get Single Customer
    server.get('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
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
            next();
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //Update Customer
    server.put('/customers/:id', async (req, res, next) => {
        //Check for JSON => JSON gönderildiğinden emin olmalısın!
        if (!req.is('application/json')) {
            next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const customer = await Customer.findOneAndUpdate(
                { _id: req.params.id },
                req.body, //body'deki alanları güncelleyecek.
            );
            res.send(200); //200: Her şey yolunda.
            next();
        } catch (error) {
            return next(new errors.InternalError(error.message));
        }
    });

    //Delete Customer
    server.del('/customers/:id', async (req, res, next) => {
        try {
            //bu işi değişkene atamamızın sebebi sanırım awaiti kullanabilmek için. asenkron olsun istiyoruz.
            const customer = await Customer.findOneAndRemove({ _id: req.params.id });

            res.send(204); //iş tamam, kayıt silindi.
            next(); //sonraki route'a geçmesi için.
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    })


}