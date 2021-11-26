const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const ShoesRoutes = require('./Shoes');
const BrandRoutes = require('./Brands');
const UserRoutes = require('./Users')
const LoginRoutes = require('./Login')
//Acá tengo las constantes de rutas creadas que requieren 
//los archivos de ruta que cree antes
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/shoes', ShoesRoutes); // http://localhost:3001/shoes
router.use('/brands', BrandRoutes); // http://localhost:3001/brands
router.use('/users', UserRoutes); // http://localhost:3001/users
router.use('/login', LoginRoutes) // http://localhost:3001/login

module.exports = router;

