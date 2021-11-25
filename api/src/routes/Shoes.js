const { Router } = require("express");
const { Shoe, User, Brand, AvaiableSizes, Color } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) =>{
    let Name = req.query.shoeName
        if (Name) {    
            try{
                let paQuery = await Shoe.findAll({
                    include: [{model:Brand},{model:Color}],
                    where:{
                        shoeName:{
                            [Op.iLike]: '%' + Name + '%'}}})
                if (!paQuery.length) {
                    return res.status(404).json('No se encontro el pais que estas buscando')
                }else{
                    return res.json(paQuery)
                }
            }
            catch(errro){
                next(error);
            }
        }
    try{
        const shoesBD = await Shoe.findAll({
            include: [{model:Brand},{model:Color}],
        })
        // const shoesColor = await Shoe.findAll({
        //     include: [{model:Color}],
        // })
        // const shoesSizes = await Shoe.findAll({
        //     include: [{model:AvailableSizes}],
        // })
        // console.log(shoesBrand)
        // console.log(shoesColor)
        // console.log(shoesSizes)
        return res.json(shoesBD)
    }
    catch(error){
        next(error);
    }
    })
    
    router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        let ap = await Shoe.findByPk(id,{
            include: [{model:Brand},{model:Color}]
        })
        return res.send(ap)
        }
    catch(error){
        next(error)
    }
    })

    router.post('/', async (req,res,next) =>{
        const {
            id, 
            description, 
            stock, 
            shoeName, 
            retailPrice, 
            thumbnail, 
            urlKey
        } = req.body;

            if(description && stock && shoeName && retailPrice){
                try{
                    const newShoe = await Shoe.create({
                        id: id,
                        description: description,
                        stock: stock,
                        shoeName: shoeName,
                        retailPrice: retailPrice,
                        thumbnail: thumbnail,
                        urlKey: urlKey,
                    });      
                    console.log(newShoe,'Antes')           
                    res.send(newShoe);
                }
                catch(error){
                    next(error)
                }
            }
            else{
                res.status(404).send({msg: "Faltan los valores basicos"})
            }
    }   );

module.exports = router;