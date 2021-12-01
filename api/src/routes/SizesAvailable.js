const { Router } = require("express");
const axios = require("axios");
const { Shoe, AvailableSizes } = require("../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        let paQuery = await AvailableSizes.findAll();
        if (!paQuery.length) {
            return res.status(404).json("Error, recall");
        } else {
            return res.json(paQuery);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
