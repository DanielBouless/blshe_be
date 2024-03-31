const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const { User } = db

router.post('/signup', async(req, res)=>{
    let { password, ...rest } = req.body
        let user = await User.findOne({where:{email: req.body.email}})
        if(!user){
          await User.create({
              ...rest, passwordDigest: await bcrypt.hash(password,10)
          })
          let newUser = await User.findOne({ where: { email: req.body.email } });
          const result = await jwt.sign(process.env.JWT_SECRET, {id: newUser})
          res.json( {user: newUser, token: result.value} );
        } else {
          res.json(`${req.body.firstname} already exists`)
        }
    }

)

router.post("/login", async (req, res) => {
  const user = await User.findOne({where:{ email: req.body.email }});
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordDigest))) {
    res.status(404).json({
      message: "Incorrect email and/or password",
    });
  } else {
    const result = jwt.sign(
      {
        id: user,
      },
      process.env.JWT_SECRET
    );

    res.json({user: user, token: result});
  
  }
});