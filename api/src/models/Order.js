const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      //autoIncrement:true,
    },

    // your orden is pending
    // your orden is in progress
    // your order is cancelled
    // your order is completed
    status:{
      type: DataTypes.ENUM('Pending', 'In Progress', 'Cancelled', 'Completed'),
      defaultValue:'Pending',
    },
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    adress: DataTypes.STRING,
    phone:DataTypes.STRING,
    email: DataTypes.STRING,
    total:{
      type:DataTypes.INTEGER,
      // allowNull:false
    }
  });
};
