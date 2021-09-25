const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

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
    console.log(`Server started on port ${config.PORT}`);
})