const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    status:{
      type: DataTypes.ENUM('Pending', 'In Progress', 'Cancelled', 'Completed'),
      defaultValue:'Pending',
    },
    total:{
      type:DataTypes.INTEGER,
      // allowNull:false
    }
  });
};
