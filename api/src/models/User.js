const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cart: { 
            type: DataTypes.STRING(1000000),
        },
        token: DataTypes.STRING,
        exp: DataTypes.DATE,
        activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        /// confirmado / autorizado:
    });
};
