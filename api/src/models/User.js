const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:DataTypes.INTEGER,
    /// confirmado / autorizado:
  },{timestamps:false});
};
