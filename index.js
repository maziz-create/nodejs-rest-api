const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
// korunacak path ve ne ile korunacağını yazdık.
// artık auth olarak aldığın token'ı headers'a eklemezsen "hiçbir şey" çalışmaz.
// headers => Authorization => jwt jwtKey olarak girilmeli postmanda.
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

/* 
    Peki ya birkaç method için protected yapmak istersen? 
    rjwt ve configi al, route sayfasına git. 
    örn: server.post('..', rjwt({secret: config.JWT_SECRET}), async(req, res, next) => ) .......
    Bu method sadece authorization ister. 14. satırdaki işlem yapılır.
*/

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { useNewUrlParser: true }
    )
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err)); //error handling

db.once('open', () => { //open handling
    require('./routes/customers')(server); //server=> db instance
    require('./routes/users')(server); //server=> db instance
    console.log(`Server started on port ${config.PORT}`);
})