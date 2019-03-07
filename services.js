var exports = module.exports = {};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('petdb', 'nodejs', 'NodeJSPassword2019', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

const Pet = sequelize.define('pet', {
    petName: {
        type: Sequelize.STRING
    },
    petAge: {
        type: Sequelize.INTEGER        
    },
    petSpecies: {
        type: Sequelize.STRING        
    },
    petLegs: {
        type: Sequelize.INTEGER        
    },
    petColour: {
        type: Sequelize.STRING        
    },
    petTail: {
        type: Sequelize.INTEGER        
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Pet.sync({force:true}).then(() => {
    console.log("Pet table recreated.");
});

/*Pet.sync({force: true}).then(() => {
    //table created
    return Pet.create({
        petName: 'Geoff',
        petSpecies: 'Dog'
    });
});*/

exports.addPet = function(pet){
    return sequelize.transaction(function (t){
        return Pet.create({
            petName: pet.petName,
            petAge: pet.petAge,
            petSpecies: pet.petSpecies,
            petLegs: pet.petDetails.petLegs,
            petColour: pet.petDetails.petColour,
            petTail: pet.petDetails.petTail
        });
    })
    //success
    .then(function(result){
        console.log(result);
    })
    //rollback
    .catch(function(err){
        console.log(err);
    });

}

exports.getPet = function(name){
    return Pet.findAll({
        where: {petName: name } })
            .then(pets => {
                return pets;
            })
    
}
