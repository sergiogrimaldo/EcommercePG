const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const ShoesRoutes = require('./Shoes');
const SizesRoutes = require('./SizesAvailable');
const BrandRoutes = require('./Brands');
const PricesRoutes = require('./prices');
const UserRoutes = require('./Users')
const LoginRoutes = require('./Login')
const mailRoutes = require('./mailRoutes')
const ordersRoutes = require('./orders')
const reviewsRoutes = require('./Reviews')
//Acá tengo las constantes de rutas creadas que requieren 
//los archivos de ruta que cree antes
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/shoes', ShoesRoutes); // http://localhost:3001/shoes
router.use('/availableSizes', SizesRoutes); // http://localhost:3001/availableSizes
router.use('/prices', PricesRoutes); // http://localhost:3001/prices
router.use('/brands', BrandRoutes); // http://localhost:3001/brands
router.use('/users', UserRoutes); // http://localhost:3001/users
router.use('/login', LoginRoutes) // http://localhost:3001/login
router.use('/sendmail', mailRoutes())  // http://localhost:3001/sendmail
router.use('/orders', ordersRoutes)  // http://localhost:3001/orders
router.use('/reviews', reviewsRoutes)  // http://localhost:3001/reviews

module.exports = router;

