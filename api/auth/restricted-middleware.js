const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
//client will send a token as authorization header 
// we will need to verify the token

module.exports = (req, res, next) => {
  // add code here to verify users are logged in

  //get token out of req header
  // Authorization: Bearer <token> 
  // code that is included will never include a space 

  const token = req.headers?.authorization?.split(" ")[1]//[Bearer,token]

  if(token){
    jwt.verify(token,secrets.jwtSecret, (err,decodedToken)=>{
      if(err){
        res.status(401).json({you: "can't touch this"})
      }else{
        req.decodedJWT = decodedToken;
        next()
      }
    })
  }else{
    res.status(401).json({you:"shan't pass"})
  }
};
