const { User } = require('../db');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const {sendPasswordEmail} = require('../services/mailerService')

const tokenGenerator = async (req, res) => {

    const {email} = req.body;

    const user = await User.findOne({
        where: {email: email}
    });

    if(!user){
        res.status(404).send('Email not found')
    }

    user.token = uuidv4();

    user.exp = Date.now() + 3600000;

    await user.save();

    const resetUrl = `http://localhost:3000/users/resetPassword/${user.token}`

    await sendPasswordEmail({email: user.email, name: user.name, url: resetUrl})

    res.send(user.token);

}

const resetPassword = async (req, res) => {
    

    const user = await User.findOne({
        where : {
            token: req.params.token,
        }
    })

    console.log(req.params.token)

    const { newPass } = req.body;

    console.log(req.body)

    if(!user){
        res.status(404).send('Token is not valid')
    }
    
    user.password = newPass;
    user.save();

    res.send(`${user.name}, your password has been changed sucessfully!`)

}

module.exports = {
    tokenGenerator,
    resetPassword,
}
