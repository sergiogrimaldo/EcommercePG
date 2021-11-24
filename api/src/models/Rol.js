const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('role', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    name:{
        type: DataTypes.STRING,
        defaultValue:'client'
    }
  }, {timestamps:false});
};
