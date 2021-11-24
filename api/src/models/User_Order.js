const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user_Order', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state:{
        type: DataTypes.ENUM('Pending','On Dispatch','Received'),
        defaultValue:'Pending',
        allowNull: false,
      },
  });
};
