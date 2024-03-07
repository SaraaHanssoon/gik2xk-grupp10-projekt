const { Model, DataTypes } = require('sequelize');
const sequelize = require('/models/index');

class User extends Model {}

User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false },
  username: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: {type: DataTypes.BLOB, allowNull: false}
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
