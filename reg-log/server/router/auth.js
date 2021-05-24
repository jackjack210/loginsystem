const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../DB/conn');
const User = require('../model/user');

router.get('/' , (req , res)=>{

    res.send('hello from router server')
 
});

//register form

router.post('/registration', async (req, res) =>{
    const { name, email, phone, password, cpassword} = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({error: "complate the form"});
    }

    try {
        
        const useremailExist = await User.findOne({email: email});
        const userphoneExist = await User.findOne({phone: phone});

        if (useremailExist) {
            return res.status(422).json({error: "email already exist"});
        }else if (userphoneExist) {
            return res.status(422).json({error: "phone number already exist"});
        }else if (password != cpassword) {
            return res.status(422).json({error: "password are not match"});
        }else {
            const user = new User({name, email, phone, password, cpassword});

            await user .save();

            res.status(201).json({message: "successfully register"});
        }

    } catch (err) {
        console.log(err);
    }

})

// login route

router.post('/signin', async (req, res) =>{
    
    try {
        let token;

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "fill the data"});
        }

        const userLogin = await User.findOne({email: email});

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password) ;

            const token = await userLogin.generateAuthToken();

            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 604800000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid parameter"});
            }else{
                res.json({ error: "user successfully signin "});
            }
        } else {
            res.status(400).json({ error: "Invalid parameter"});
        }

    } catch (err) {
        console.log(err);
    }

})


module.exports = router;