const { Router } = require("express");

// Ejemplo: const authRouter = require('./auth.js');

const { postUserAndPass, postGoogleOAuth, getActivity } = require("./controllers/user");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", postUserAndPass);

router.post("/google", postGoogleOAuth);

router.get("/", getActivity);

module.exports = router;
