const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productImg', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  //productId
}, {
  timestamps: false //desativamos los timestamps - cuando creamos o actualizamos una imagen.
});

module.exports = ProductImg;