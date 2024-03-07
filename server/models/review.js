const { Model, DataTypes } = require('sequelize');
const sequelize = require('/models/index'); 

class Review extends Model {}

Review.init({
  review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT }
}, {
  sequelize,
  modelName: 'Review'
});

module.exports = Review;
