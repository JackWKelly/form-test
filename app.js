const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const services = require('./services')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//load custom dependencies
const routes = require('./routes');

//set api routes
app.use('/api/pet', routes);


app.listen(port = 3000, function (){
    console.log(`Listening on port ${port}!`);
});