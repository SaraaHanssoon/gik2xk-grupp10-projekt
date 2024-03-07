const { Model, DataTypes } = require('sequelize');
const sequelize = require('/models/index');

class CartRow extends Model {}

CartRow.init({
  cartrow_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false },
  cart_id: { type: DataTypes.INTEGER, references: { model: 'Cart', key: 'cart_id' } },
  product_id: { type: DataTypes.NUMERIC, references: { model: 'Product', key: 'product_id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'CartRow'
});

module.exports = CartRow;
