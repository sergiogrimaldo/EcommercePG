const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shoe', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    description:{
        type: DataTypes.STRING(1000),
        defaultValue:'No description'
    },

    stock:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    },
     shoeName:{
        type:DataTypes.STRING(1000),
    },
    retailPrice: {
        type: DataTypes.STRING(1000),
      },
    thumbnail: {
    type: DataTypes.STRING(1000),
    },
    urlKey: {
        type: DataTypes.STRING(1000),
    },
  },{timestamps:false});
};
