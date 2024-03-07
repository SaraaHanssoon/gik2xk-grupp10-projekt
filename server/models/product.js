const { Model, DataTypes } = require('sequelize');
const sequelize = require('/models/index');

class Product extends Model {}

Product.init({
  product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false },
  name: { type: DataTypes.TEXT, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'Product'
});

module.exports = Product;
