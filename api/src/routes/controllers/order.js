const { Activity, Country, CountryActivity } = require("../db");
const { URL } = require("../Variables");
const axios = require("axios");

const newActivity = async (req, res, next) => {
  if (!req.body) res.send("Reacer el formulario");
  const { name, difficulty, duration, season, about, countryId } = req.body;
  try {
    let result = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      about,
    });
    if (result) {
      countryId.forEach((e) => result.addCountries(e));
      let Lastresult = {
        id: result.id,
        name: result.name,
        difficulty: result.difficulty,
        duration: result.duration,
        season: result.season,
        about: result.about,
        countryId: countryId,
      };
      res.status(200).json(Lastresult);
    } else res.sendStatus(500);
  } catch (err) {
    next(err);
  }
};

const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findAll({
      include: { model: Country },
    });
    res.status(200).json(activity);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newActivity,
  getActivity,
};
