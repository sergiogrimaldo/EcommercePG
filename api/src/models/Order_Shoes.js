const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Order_Shoes", 
  { orderId: 
    {
        type: DataTypes.INTEGER, 
        unique: 'actions_unique',
        primaryKey: true,
    },
    
    shoeId: {
        type: DataTypes.INTEGER, 
        unique: 'actions_unique',
        primaryKey: true,
    },
    cuantity:DataTypes.INTEGER,
    size:{
        type:DataTypes.STRING,
        unique: 'actions_unique',
        primaryKey: true,
    },
    subtotal:DataTypes.INTEGER }
  , {
    uniqueKeys: {
        actions_unique: {
            fields: ['orderId', 'shoeId', 'size']
        }
    }})}