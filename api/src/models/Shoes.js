const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shoes', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    colorWay:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // size: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    shoeName:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    retailPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    urlKey: {
        type: DataTypes.STRING,
        allowNull:false,
    },
  },{timestamps:false});
};
