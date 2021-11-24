const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  ///Buscar una forma de hacerlo mas corto 
  sequelize.define('avaiableSizes', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    '1':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '1.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '2':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '2.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '3':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '3.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '4':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '4.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '5.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '6':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '6.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '7':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '7.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '8':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '8.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '9':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '9.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '10':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '10.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '11.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '12':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '12.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '13':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '13.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '14':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '14.5':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    '15':{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
  },{timestamps:false});
};
