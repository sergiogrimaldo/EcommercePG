const { Router } = require("express");
const { OAuth2Client } = require("google-auth-library");

// const { UPSERT } = require("sequelize/types/lib/query-types");
/// ??????
const { User } = require("../db");
// require('dotenv').config();

// const express = require('express'),
//       bodyParser = require('body-parser'),
const jwt = require("jsonwebtoken");
const router = Router();

const origin =
    process.env.DB_HOST === "localhost"
        ? "535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
        : "712548091909-h0gqr6u8q1mj7s3ac3p5s0hkn6snkptf.apps.googleusercontent.com";


//console.log(process.env)
// // 1
// app.set('llave', config.llave); /// ESTO en .env

// // 2
// router.use(bodyParser.urlencoded({ extended: true }));

// // 3
// router.use(bodyParser.json());

// 4
router.get("/", function (req, res) {
    res.json({ message: "recurso de entrada" });
});


router.post('/autenticar', async (req, res) => {
  const {  email, password } = req.body

  console.log(req.body)

  // if(req.body.name === "asfo" && req.body.password === "holamundo") {
  let user = await User.findOne({where:{email:email}} )
  if ( user && user.password === password  ){


		const payload = {
      email,
      id: user.id,
      role: user.roleId,
			// token: token,
      name: user.name,
      email: email,
		};

    /// uso el secreto del .env
    console.log(process.env.TOKENSECRET)
		const token = jwt.sign(payload, process.env.TOKENSECRET, {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
      role: user.roleId,
			token: token,
      name: user.name,
      email: email,
		});
    } else {
        res.status(300).json({ mensaje: "Usuario o contraseña incorrectos"})
    }
});

router.post("/googleAutenticar", async (req, res) => {
    console.log(req.body);

    const googleId = origin;

    const googleClient = new OAuth2Client({
        clientId: `${googleId}`,
    });

    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({ idToken: token, audience: `${googleId}` });

    const payload = ticket.getPayload();

    console.log(payload);

      
  const user = await User.findOrCreate({where: {email: payload.email}, defaults: {
    password: payload.at_hash,
    name: payload.name,
    roleId: 1,
  }})

  const jtoken = jwt.sign({email: user[0].email, name: user[0].name, role:user[0].roleId, id:user[0].id}, process.env.TOKENSECRET, {
    expiresIn: 1440
  });
  
  res.json({
    mensaje: 'Autenticación correcta',
    token: jtoken,
    id: user[0].id,
    role: user[0].roleId,
    name: user[0].name,
    email: user[0].email,
  });

    // const jtoken = jwt.sign({ email: user[0].email, name: user[0].name }, process.env.TOKENSECRET, {
    //     expiresIn: 1440,
    // });

    // res.json({
    //     mensaje: "Autenticación correcta",
    //     token: jtoken,
    //     name: user[0].name,
    //     email: user[0].email,
    //     id: user[0].id,
    // });
});

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

module.exports = router;
