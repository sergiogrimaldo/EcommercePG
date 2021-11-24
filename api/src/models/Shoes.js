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
        type: DataTypes.STRING(1000),
        defaultValue:'No description'
        //allowNull: false
    },
    colorWay:{
        type: DataTypes.STRING(),
        //allowNull: false
    },
    stock:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
        // validate:{
        //     min: 0
        // }
    },
    // size: {
    //   type: DataTypes.STRING(1000),
    //   allowNull: false,
    // },
    shoeName:{
        type:DataTypes.STRING(1000),
        //allowNull: false,
    },
    retailPrice: {
        type: DataTypes.STRING(1000),
        //allowNull: false,
      },
    thumbnail: {
    type: DataTypes.STRING(1000),
    //allowNull: false,
    },
    brand: {
        type: DataTypes.STRING(1000),
        //allowNull: false,
        },
    urlKey: {
        type: DataTypes.STRING(1000),
        //allowNull:false,
    },
  },{timestamps:false});
};
