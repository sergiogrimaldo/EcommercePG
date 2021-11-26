const { Router } = require("express");
const express = require('express'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      app = express();

const router = Router();	  

const config = {
	llave : "miclaveultrasecreta123*"
}; 

// 1
app.set('llave', config.llave);

// 2
router.use(bodyParser.urlencoded({ extended: true }));

// 3
router.use(bodyParser.json());

// 4
router.get('/', function(req, res) {
    res.json({ message: 'recurso de entrada' });
});


router.post('/autenticar', (req, res) => {
    if(req.body.name === "asfo" && req.body.password === "holamundo") {
		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, router.get(config.llave), {
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

// 6
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
	
    if (token) {
      jwt.verify(token, router.get(config.llave), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

 router.get('/datos', rutasProtegidas, (req, res) => {
	const datos = [
		{ id: 1, name: "Asfo" },
		{ id: 2, name: "Denisse" },
		{ id: 3, name: "Carlos" }
	];
	
	res.json(datos);
});

module.exports= router