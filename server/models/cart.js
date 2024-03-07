const { Model, DataTypes } = require('sequelize');
const sequelize = require('/models/index');

class Cart extends Model {}

Cart.init({
  cart_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  user_id: { type: DataTypes.INTEGER, references: { model: 'User', key: 'user_id' } }
}, {
  sequelize,
  modelName: 'Cart'
});

module.exports = Cart;
