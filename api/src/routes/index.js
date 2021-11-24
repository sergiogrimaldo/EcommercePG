const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const ShoesRoutes = require('./Shoes');
//const ActivityRoutes = require('./activity.js');
//Acá tengo las constantes de rutas creadas que requieren 
//los archivos de ruta que cree antes
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/shoes', ShoesRoutes); // http://localhost:3001/shoes
//router.use('/actividades', ActivityRoutes); // http://localhost:3001/actividades

module.exports = router;

