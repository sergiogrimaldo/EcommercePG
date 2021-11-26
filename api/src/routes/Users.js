const { Router } = require("express");
const { Shoe, User, Brand, AvaiableSizes, Color, Role } = require('../db');
const { Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) =>{
    let Name = req.query.userName
        if (Name) {    
            try{
                let paQuery = await User.findAll({
                    include: [{model:Role}],
                    where:{
                        userName:{
                            [Op.iLike]: '%' + Name + '%'}}})
                if (!paQuery.length) {
                    return res.status(404).json('No se encontro el usuario que estas buscando')
                }else{
                    return res.json(paQuery)
                }
            }
            catch(errro){
                next(error);
            }
        }
    try{
        const userBD = await User.findAll({
            include: [{model:Role}],
        })
        return res.json(userBD)
    }
    catch(error){
        next(error);
    }
    })

router.get('/:id', async (req, res, next)=>{   
    try{
        const {id} = req.params;
        let ap = await User.findByPk(id,{
            include: [{model:Role}]
        })
        return res.send(ap) 
        }
    catch(error){
        next(error)
    }
    });

    router.post('/', async (req,res,next) =>{
        const {
            name,
            email,
            password,
        } = req.body;
            console.log(req.body)
            if(email && password){
                try{
                    const newUser = await User.create({
                        name: name,
                        email: email, //aca creo un nuevo user con las propiedades que necesito
                        password: password,
                    });
                    const rol = await Role.findOne({
                        where:{ //aca busco en la base de datos donde uno tenga la propiedad client 
                            name:"client"
                        }
                    })
                    await newUser.setRole(rol)        
                    res.send(newUser); //aca seteo a un nuevo user con el rol "cliente"
                }
                catch(error){
                    next(error)
                }
            }
            else{
                res.status(404).send({msg: "Faltan los valores basicos"})
            }
    });

    router.delete('/:id', async function (req, res, next) {
        const {id} = req.params;
        try {
            let existsInDB = await User.findOne({
                where: {
                    id,
                }
            });
            if (existsInDB) {
                User.destroy({
                    where: {
                        id,
                    }
                });
                return res.status(200).send('User has been deleted from database successfully')  
            }																																										
            else throw new Error('ERROR 500: User with given name does not exist in database')
        } catch (err) {
            next(err)
        }
    });

module.exports = router;