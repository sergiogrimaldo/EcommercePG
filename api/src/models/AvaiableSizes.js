const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    ///Buscar una forma de hacerlo mas corto
    sequelize.define(
        "avaiableSizes",
        {
            3.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            4: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            4.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            5.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            6: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            6.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            7: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            7.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            8: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            8.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            9: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            9.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            10: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            10.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            11.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            12.5: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        { timestamps: false }
    );
};
