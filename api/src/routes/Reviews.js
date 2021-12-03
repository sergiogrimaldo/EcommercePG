const { Router } = require("express");
const { Shoe, User, Brand, AvaiableSizes, Color, Role, Reviews } = require("../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const userBD = await Reviews.findAll();
        return res.json(userBD);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        let reviews = await User.findByPk(id,{
            include: [{ model:Reviews, include: [{ model:Shoe }] }]
        })
        return res.send(reviews) 
        }
    catch(error){
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    let { comment, rating, userId, shoeId } = req.body;
    if (!comment) comment = "";
    console.log(req.body);
    if (comment && rating) {
        try {
            const newReview = await Reviews.create({
                include: [{ model: User }, { model: Shoe }],
                comment,
                rating, //aca creo una nueva review con las propiedades que necesito
                userId,
                shoeId,
            });
            res.send(newReview);
        } catch (error) {
            next(error);
        }
    } else {
        res.status(404).send({ msg: "No review found" });
    }
});

module.exports = router;
