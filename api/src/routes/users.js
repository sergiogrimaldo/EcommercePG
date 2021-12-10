const { Router } = require("express");
const { Shoe, User, Brand, AvaiableSizes, Color, Role, Reviews } = require('../db');
const { Op } = require('sequelize');
const { tokenGenerator, resetPassword } = require("../controllers/userController");

const router = Router();

router.get('/', async (req, res, next) =>{
    let Name = req.query.userName
        if (Name) {    
            try{
                let paQuery = await User.findAll({
                    include: [{model:Role}, { model: Reviews }],
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
            include: [{model:Role}, { model: Reviews }],
        })
        userBD && console.log("soy userBD de users routes",userBD)
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
            include: [{model:Role}, { model: Reviews }]
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
                        include: [{ model: Reviews }],
                        name: name,
                        email: email, //aca creo un nuevo user con las propiedades que necesito
                        password: password,
                    });
                    const rol = await Role.findOne({
                        include: [{ model: Reviews }],
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
        console.log(req.params)
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

    router.patch('/:id', async function (req, res, next){
        const { email } = req.body;

        const user = await User.findByPk(req.params.id)

        if(!user){
            return res.status(400).json("Invalid User")
        }

        const admi = await User.findOne({ where: {email: email}});

        if( admi.roleId === 2 ){
            if(user.roleId === 1){
                user.setRole(2)
                user.save();
            } else {
                user.setRole(1)
                user.save();
            }
            return res.json(await User.findAll());
        } else {
            return res.status(401).json("You are not allowed to do this action")
        }

    })
    router.post('/resetPassword', tokenGenerator)
    router.post('/resetPassword/:token', resetPassword)

module.exports = router;