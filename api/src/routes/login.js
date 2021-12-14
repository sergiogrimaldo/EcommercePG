const { Router } = require("express");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const router = Router();

const origin = "712548091909-h0gqr6u8q1mj7s3ac3p5s0hkn6snkptf.apps.googleusercontent.com";

router.get("/", function (req, res) {
    res.json({ message: "recurso de entrada" });
});

router.post("/autenticar", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (user && user.password === password && user.activated == true) {
        const payload = {
            email,
            id: user.id,
            role: user.roleId,
            name: user.name,
            email: email,
        };

        const token = jwt.sign(payload, process.env.TOKENSECRET, {
            expiresIn: 1440,
        });
        res.json({
            mensaje: "Autenticación correcta",
            role: user.roleId,
            token: token,
            name: user.name,
            email: email,
        });
    } else {
        res.status(300).json({ mensaje: "Usuario o contraseña incorrectos" });
    }
});

router.post("/googleAutenticar", async (req, res) => {
    const googleId = origin;

    const googleClient = new OAuth2Client({
        clientId: `${googleId}`,
    });

    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({ idToken: token, audience: `${googleId}` });

    const payload = ticket.getPayload();

    const user = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
            password: payload.at_hash,
            name: payload.name,
            roleId: 1,
            activated: true,
        },
    });

    const jtoken = jwt.sign({ email: user[0].email, name: user[0].name, role: user[0].roleId, id: user[0].id }, process.env.TOKENSECRET, {
        expiresIn: 1440,
    });

    res.json({
        mensaje: "Autenticación correcta",
        token: jtoken,
        id: user[0].id,
        role: user[0].roleId,
        name: user[0].name,
        email: user[0].email,
    });
});

module.exports = router;
