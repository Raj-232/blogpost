const { Sequelize } = require('sequelize')

const database = new Sequelize('empolyee', 'postgres', 'admin', {
    host: "localhost",
    dialect: 'postgres',
})


module.exports = database