const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt'); 

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Hook de sequalize aplicada en un modelo!

User.beforeCreate(async (user) => { // antes de que se cree el usuario en la BD.
    const password = user.password // sin encriptar
    const hasPassword = await bcrypt.hash(password, 10) //cantidad de interaccion para encriptar la clave.
    user.password = hasPassword //se entroduce la clave encriptada
})

module.exports = User;