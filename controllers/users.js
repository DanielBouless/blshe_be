const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const { User } = db

router.post('/signup', async(req, res)=>{
    let { password, ...rest } = req.body
    if (await User.findOne({where: {email: req.body.email}})){
        res.json('User Already Exists')
    } else {
        await User.create({
            ...rest, passwordDigest: await bcrypt.hash(password, 10)
        })
        res.status(200).json("User Created")
    }

})

