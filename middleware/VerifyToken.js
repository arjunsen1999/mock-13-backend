require('dotenv').config()
const jwt = require('jsonwebtoken');
const secretKey = process.env.scretKey;

const VerifyToken = async (req, res, next) =>{
   try {
    let token = req.headers.authtoken || null;
    if(!token){
        res.status(400).send({msg : "Sorry! You have to login first!"});
    }
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            res.status(400).send({msg : "Sorry! You have to login first!"});
        }else{
            req.authId = decoded._id;
            next();
        }
      });
   } catch (error) {
    res.status(400).send({msg : "Somthing Went Wrong in Token", error})
   }
}

module.exports = {VerifyToken}
