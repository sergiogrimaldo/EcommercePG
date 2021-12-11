const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    // defino el modelo
    ///Buscar una forma de hacerlo mas corto
    sequelize.define(
        "price",
        {
            retailPrice: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '35': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '40': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '45': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '50': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '55': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '60': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '65': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '70': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '75': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '80': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '85': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '90': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '95': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '100': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '105': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '110': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '115': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '120': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '125': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '130': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '140': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '150': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '160': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '170': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            '180': {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        { timestamps: false }
    );
};
