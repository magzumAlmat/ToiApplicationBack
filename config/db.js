const fs = require('fs')
const{Sequelize} = require('sequelize');

let sequelize;
const dbConf = require('./config')
if (process.env.NODE_ENV==='production'){
    console.log('prod MODE TURNED ON')
     sequelize = new Sequelize({
        database:dbConf.production.database, 
        username:dbConf.production.username,
        host:dbConf.production.host,
        dialect:dbConf.production.dialect,
        password:dbConf.production.password, 
        port:dbConf.production.port,
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync('config/ca-certificate.crt')
            },
        },

        pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    // Это спасает от 90 % таких ошибок
    keepAlive: true,
    // Важно! Проверяет валидность соединения перед использованием
    validate: true
  },
  // И это тоже очень помогает
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /the database system is in recovery mode/
    ],
    max: 5
  },



    })
}
else{
sequelize = new Sequelize({
    database:dbConf.development.database, 
    username:dbConf.development.username,
    host:dbConf.development.host,
    dialect:dbConf.development.dialect,
    password:dbConf.development.password, 
    pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    // Это спасает от 90 % таких ошибок
    keepAlive: true,
    // Важно! Проверяет валидность соединения перед использованием
    validate: true
  },
  // И это тоже очень помогает
  retry: {
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /the database system is in recovery mode/
    ],
    max: 5
  },


})
}
sequelize
    .authenticate ( )
    .then ( () => {
        console. log( 'Connection to the database has been established successfully.')
        }).catch((error) =>{

console.error('Unable to connect to the database:', error);

});

module.exports = sequelize;