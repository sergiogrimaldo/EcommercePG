const { Router } = require("express");
<<<<<<< HEAD
const { Shoe, User, Brand, AvaiableSizes, Color, Role, Reviews } = require("../db");
=======
const axios = require("axios");
const { Shoe, User,Price, Brand, AvailableSizes, Color ,Reviews} = require("../db");
>>>>>>> 09878a7ec2ea99de3292b9d2f1c2c906df6466bf
const { Op } = require("sequelize");

const router = Router();

<<<<<<< HEAD
router.get("/", async (req, res, next) => {
    try {
        const userBD = await Reviews.findAll();
        return res.json(userBD);
=======
router.post('/', async (req,res,next) =>{
    let id = req.query.userId;
    const {
        comment,
        rating,
        userId,
        shoeId,
    } = req.body;
        console.log(req.body)
        if(comment && rating){
            try{
                const newReview = await Reviews.findOrCreate({
                    where:{
                        userId:userId,
                        shoeId:shoeId,
                    },
                    include: [{model: User}, {model: Shoe}],
                    defaults:{
                        comment: comment,
                        rating: rating,
                        userId: userId,
                        shoeId: shoeId,
                    }
                    
                });
                if(newReview[1]===true){
                    res.send(newReview);  
                }else{
                    if(comment){
                    newReview[0].comment=comment
                    }
                    if(rating){
                        newReview[0].rating=rating 
                    }
                    await newReview[0].save()
                }
                return res.send(newReview[0]); 
            }
            catch(error){
                next(error)
            }
        }
        else{
            res.status(404).send({msg: "Faltan los valores basicos"})
        }
});

router.get("/", async (req, res, next) => {
    let Name = req.query.id;
    if (Name) {
        try {
            let paQuery = await Reviews.findAll({
                include: [{model:Shoe}, { model: User }],
                where: {
                    id: {
                        [Op.iLike]: "%" + Name + "%",
                    },
                },
            });
            if (!paQuery.length) {
                return res.status(404).json("Error, recall");
            } else {
                return res.json(paQuery);
            }
        } catch (errro) {
            next(error);
        }
    }
    try {
        const reviewsBD = await Reviews.findAll({
            include: [{model:Shoe}, { model: User }],
        });
        return res.json(reviewsBD);
>>>>>>> 09878a7ec2ea99de3292b9d2f1c2c906df6466bf
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
<<<<<<< HEAD
        let reviews = await User.findByPk(id,{
            include: [{ model:Reviews, include: [{ model:Shoe }] }]
=======
        let reviews = await Reviews.findByPk(id,{
            include: [{ model:Shoe }, { model:User }]
>>>>>>> 09878a7ec2ea99de3292b9d2f1c2c906df6466bf
        })
        return res.send(reviews) 
        }
    catch(error){
        next(error)
    }
});

<<<<<<< HEAD
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
=======
// router.delete('/:id', async function (req, res, next) {
//         const {id} = req.params;
//     try {
//         let existsInDB = await Reviews.findOne({
//             where: {
//                 id,
//             }
//         });
//         if (existsInDB) {
//             Reviews.destroy({
//                 where: {
//                     id,
//                 }
//             });
//             return res.status(200).send('Reviews has been deleted from database successfully')  
//         }																																										
//         else throw new Error('ERROR 500: Reviews with given id does not exist in database')
//     } catch (err) {
//         next(err)
//     }
// });

//const getOrdersFromDB = async function ({email="", id=""}){
router.delete('/:id', async function (req, res, next) {
    const user = await User.findOne({where: { email:req.body.email }})
    //encuentro al usuario  
    if(user.id){

        if(user.roleId === 2){
            const {id} = req.params;
            try {
                let existsInDB = await Reviews.findOne({
                    where: {
                        id,
                    }
                });
                if (existsInDB) {
                    Reviews.destroy({
                        where: {
                            id,
                        }
                    });
                    return res.status(200).send('Reviews has been deleted from database successfully')  
                }																																										
                else throw new Error('ERROR 500: Reviews with given id does not exist in database')
            } catch (err) {
                next(err)
            }
        } else {
            if(user.id === Reviews.userId){
                let existsInDB = await Reviews.findOne({
                    where: {
                        id,
                    }
                });
                if (existsInDB) {
                    Reviews.destroy({
                        where: {
                            id,
                        }
                    })};
            } else {
                return "You don´t have access to this server"
            }
        }
    };
}); 
    //si te pide una orden en especifico: si es admi la devulvo 
    //sino verifico que sea del usuario y si es la devuelvo


    // if(user.roleId === 2){
    //     return ( await Order.findAll({
    //         include: { model: Shoe },}) )
    // } else {
    //     return ( await Order.findAll({include: { model: Shoe }, where: {userId: user.id}}))
    // }
    //si me piden todas las ordenes: si es admi devuelvo todas 
    //sino verifico y devuelvo solo las del usuario que las solicita


module.exports = router
>>>>>>> 09878a7ec2ea99de3292b9d2f1c2c906df6466bf
