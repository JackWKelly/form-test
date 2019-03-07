const services = require('./services');


var exports = module.exports = {};

exports.addPet = function(req, res) {
    console.log(req.body);
    services.addPet(req.body)
        .then(function(data){
            res.send(data);
        })
}

exports.getPet = function(req, res) {
    console.log(req.params.name);
    services.getPet(req.params.name)
        .then(function(data){
            res.send(data);
        })
}

