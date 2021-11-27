const { Router } = require("express");
// const { UPSERT } = require("sequelize/types/lib/query-types");
/// ??????
const {User} = require('../db')
// require('dotenv').config();

// const express = require('express'),
//       bodyParser = require('body-parser'),
const jwt = require('jsonwebtoken')
const router = Router();	  


//console.log(process.env)
// // 1
// app.set('llave', config.llave); /// ESTO en .env

// // 2 
// router.use(bodyParser.urlencoded({ extended: true }));

// // 3
// router.use(bodyParser.json());

// 4
router.get('/', function(req, res) {
    res.json({ message: 'recurso de entrada' });
});


router.post('/autenticar', async (req, res) => {
  const { name, email, password } = req.body
    // if(req.body.name === "asfo" && req.body.password === "holamundo") {
    let user = await User.findOne({where:{email:email}} )
    if ( user && user.length > 0 && user.password === password  ){

		const payload = {
      name,
      email
		};

    /// uso el secreto del .env
    console.log(process.env.TOKENSECRET)
		const token = jwt.sign(payload, process.env.TOKENSECRET, {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

// esto todavia no lo mire y por el momento no lo usamos, capaz para las rutas de admin mas adelante
// // 6
// const rutasProtegidas = Router(); 
// rutasProtegidas.use((req, res, next) => {
//     const token = req.headers['access-token'];
	
//     if (token) {
//       jwt.verify(token, router.get(config.llave), (err, decoded) => {      
//         if (err) {
//           return res.json({ mensaje: 'Token inválida' });    
//         } else {
//           req.decoded = decoded;    
//           next();
//         }
//       });
//     } else {
//       res.send({ 
//           mensaje: 'Token no proveída.' 
//       });
//     }
//  });

//  router.get('/datos', rutasProtegidas, (req, res) => {
// 	const datos = [
// 		{ id: 1, name: "Asfo" },
// 		{ id: 2, name: "Denisse" },
// 		{ id: 3, name: "Carlos" }
// 	];
	
// 	res.json(datos);
// });

module.exports= router