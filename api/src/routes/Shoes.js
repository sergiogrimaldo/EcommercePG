const { Router } = require("express");
const { Shoes, User } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) =>{
    let Name = req.query.shoeName
        if (Name) {    //ACA ME TRAIGO TODOS LOS PAISES
            try{
                let paQuery = await Shoes.findAll({
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
        const shoesBD = await Shoes.findAll({})
        return res.json(shoesBD)
    }
    catch(error){
        next(error);
    }
    })
    
    router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        let ap = await Shoes.findByPk(id)
        return res.send(ap)
        }
    catch(error){
        next(error)
    }
    })

    module.exports = router;