const { Router } = require("express");
const { Shoe, User, Brand, AvailableSizes, Color } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) =>{
        let Name = req.query.name
            if (Name) { 
                try{
                    let brandsQuery = await Brand.findAll({
                        where:{
                            name:{
                                [Op.iLike]: '%' + Name + '%',
                                [Op.iLike]: '%' + Name,
                                [Op.iLike]: Name + '%',
                                [Op.iLike]: Name,
                            }
                            }})
                    if (!brandsQuery.length) {
                        return res.status(404).json('No se encontro el pais que estas buscando')
                    }else{
                        return res.json(brandsQuery)
                    }
                }
                catch(errro){
                    next(error);
                }
            }
        try{
            const brandsDB = await Brand.findAll({})
            return res.json(brandsDB)
        }
        catch(error){
            next(error);
        }
        })

module.exports = router;