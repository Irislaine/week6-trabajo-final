const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //productId
  //userId -> lo obetengo del req.user.id
});

module.exports = Cart;