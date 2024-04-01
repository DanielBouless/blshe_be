const db = require("../models");
const jwt = require("jsonwebtoken");

const { User } = db;

const defineCurrentUser = async(req, res, next) => {
  try {
    if(req.headers.authorization){
      console.log(`headers: ${JSON.stringify(req.headers.authorization)}`)
    const [method, token] = req.headers.authorization.split(" ");
    if (method == "Bearer" && !token === null) {
jwt.verify(token,process.env.JWT_SECRET, (err, decoded)=>{
  if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
} 
  req.currentUser = decoded.user
  console.log(`define current user decoded user: ${decoded.user}`)
}
)

      // const result = jwt.decode(process.env.JWT_SECRET, token);
      // console.log(`result: ${JSON.stringify(result)}`)
      //   const { id } = result.value;
      //    console.log(`id: ${id}`);
      //   let rqUser = await User.findOne({where: {userId: id }});
      //   req.currentUser = rqUser;
      }}
    next();
  } catch (err) {
    req.currentUser = null;
    console.log(err)
    next();
  }
}

module.exports = defineCurrentUser;
