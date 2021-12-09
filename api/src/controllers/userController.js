const { User } = require('../db');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const { sendMail } = require('../services/mailerService')

const tokenGenerator = async (req, res) => {

    const {email, tokenCase} = req.body;
    console.log(email, tokenCase)

    const user = await User.findOne({
        where: {email: email}
    });

    if(!user){
        res.status(404).send('Email not found')
    }

    user.token = uuidv4();

    user.exp = Date.now() + 3600000;

    await user.save();

    let url 
    switch (tokenCase){
        case 'resetPassword':
             url = `http://localhost:3000/users/resetPassword/${user.token}`
            await sendMail({template:'resetPassword',email: user.email, name: user.name, url: url})
        break
        case 'validateUser':
            url = `http://localhost:3000/users/activate/${user.token}`
            await sendMail({template:'activateAccount',email: user.email, name: user.name, url: url})
        break

    }


    return(res.send(user.token));

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

const validateUser = async (req, res) => {
    
    const user = await User.findOne({
        where : {
            token: req.params.token,
        }
    })

    console.log(req.params.token)

    if(!user){
        res.status(404).send('Token is not valid')
    }
    
    user.activated = true
    user.save();

    res.send(`${user.name}, your account has been activated!`)

}

module.exports = {
    tokenGenerator,
    resetPassword,
    validateUser
}
