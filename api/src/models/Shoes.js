const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shoes', {
    _id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    description:{
        type: DataTypes.STRING,
        //allowNull: false
    },
    colorway:{
        type: DataTypes.STRING,
        //allowNull: false
    },
    stock:{
        type:DataTypes.INTEGER,
        default: 0,
        // validate:{
        //     min: 0
        // }
    },
    // size: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    shoeName:{
        type:DataTypes.STRING,
        //allowNull: false,
    },
    retailPrice: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
    thumbnail: {
    type: DataTypes.STRING,
    //allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        //allowNull: false,
        },
    urlKey: {
        type: DataTypes.STRING,
        //allowNull:false,
    },
  },{timestamps:false});
};
