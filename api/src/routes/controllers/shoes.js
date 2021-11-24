const { Activity, Country, CountryActivity } = require("../db");
const axios = require("axios");
const { Op, where } = require("sequelize");
const { URL } = require("../Variables");

const call = async (URL, flag) => {
  try {
    const call = await axios.get(URL);
    const arr = call.data.map((e) => ({
      id: e.cca3,
      name: e.translations.spa.common,
      nameToSerch: e.translations.spa.common
        .toLowerCase()
        .normalize("NFD")
        .replace(
          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
          "$1"
        )
        .normalize(),
      flag: e.flags[1],
      map: e.maps.googleMaps,
      continent: e.continents[0],
      capital: e.capital ? e.capital[0] : "No capital registered",
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    }));
    if (flag === true) {
      const result = await Country.bulkCreate(arr);
      return result;
    } else return arr;
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (req, res, next) => {
  const { name } = req.query;
  if (name) return next();
  try {
    const activityDb = await Country.findAll({
      include: {
        model: Activity,
      },
    });
    if (!activityDb.length) {
      const firstCall = await call(URL.COUNTRIES, true);
      res.json(firstCall);
    } else res.json(activityDb);
  } catch (err) {
    next(err);
  }
};

const getFromId = (req, res, next) => {
  const { id } = req.params;
  Country.findByPk(id.toUpperCase(), {
    include: {
      model: Activity,
    },
  })
    .then((countryDb) => {
      countryDb
        ? res.json([countryDb])
        : res.status(404).send("No matches were found");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send("No matches were found");
    });
};

const getFromName = async (req, res, next) => {
  const { name } = req.query;
  const lowerName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
  if (!name) res.status(404).send("Reacer el formulario");
  try {
    const result = await Country.findAll({
      where: {
        nameToSerch: {
          [Op.or]: {
            [Op.like]: "%" + lowerName + "%",
            [Op.like]: "%" + lowerName,
            [Op.like]: lowerName + "%",
            [Op.substring]: lowerName,
          },
        },
      },
      include: {
        model: Activity,
      },
    });
    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).send(`${name} doesn't exist`);
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req, res, next) => {
  const { order, column } = req.params;
  try {
    const result = await Country.findAll({
      order: [[column, order]],
      include: {
        model: Activity,
      },
    });
    if (result.length) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const getFiltcontinent = async (req, res, next) => {
  const { continent } = req.params;
  const lowerContinent = continent
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
  try {
    const result = await Country.findAll({
      where: {
        continent: {
          [Op.or]: {
            [Op.like]: "%" + lowerContinent + "%",
            [Op.like]: "%" + lowerContinent,
            [Op.like]: lowerContinent + "%",
            [Op.substring]: lowerContinent,
          },
        },
      },
      include: {
        model: Activity,
      },
    });
    if (result.length) {
      res.status(200).json(result);
    } else {
      res.status(404).send(`${continent} doesn't exist`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getOrder,
  getFromId,
  getFromName,
  getFiltcontinent,
};
