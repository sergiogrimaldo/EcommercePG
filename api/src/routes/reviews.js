const { Router } = require("express");
const axios = require("axios");
const { Shoe, User, Price, Brand, AvailableSizes, Color, Reviews } = require("../db");
const { Op } = require("sequelize");

const router = Router();

router.post("/", async (req, res, next) => {
    let id = req.query.userId;
    const { comment, rating, userId, shoeId } = req.body;
    if (comment && rating) {
        try {
            const newReview = await Reviews.findOrCreate({
                where: {
                    userId: userId,
                    shoeId: shoeId,
                },
                include: [{ model: User }, { model: Shoe }],
                defaults: {
                    comment: comment,
                    rating: rating,
                    userId: userId,
                    shoeId: shoeId,
                },
            });
            if (newReview[1] === true) {
                return res.send(newReview);
            } else {
                if (comment) {
                    newReview[0].comment = comment;
                }
                if (rating) {
                    newReview[0].rating = rating;
                }
                await newReview[0].save();
            }
            return res.send(newReview[0]);
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(404).send({ msg: "Faltan los valores basicos" });
    }
});

router.get("/", async (req, res, next) => {
    try {
        const reviewsBD = await Reviews.findAll({
            include: [{ model: User }, { model: Shoe }],
        });
        return res.json(reviewsBD);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let reviews = await User.findByPk(id, {
            include: [{ model: Reviews, include: { model: Shoe } }],
        });
        return res.send(reviews);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async function (req, res, next) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user.id) {
        if (user.roleId === 2) {
            const { id } = req.params;
            try {
                let existsInDB = await Reviews.findOne({
                    where: {
                        id,
                    },
                });
                if (existsInDB) {
                    Reviews.destroy({
                        where: {
                            id,
                        },
                    });
                    return res.status(200).send("Reviews has been deleted from database successfully");
                } else throw new Error("ERROR 500: Reviews with given id does not exist in database");
            } catch (err) {
                next(err);
            }
        } else {
            if (user.id === Reviews.userId) {
                let existsInDB = await Reviews.findOne({
                    where: {
                        id,
                    },
                });
                if (existsInDB) {
                    Reviews.destroy({
                        where: {
                            id,
                        },
                    });
                }
            } else {
                return "You don´t have access to this server";
            }
        }
    }
});

module.exports = router;
