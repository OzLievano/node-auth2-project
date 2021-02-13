const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router =require('express').Router();
const Users = require('../../api/users/users-model');
const { isValid } = require('../users/users-service');
const secrets = require('../config/secrets')
router.post('/register', function registerUser(req,res){
    const credentials = req.body;

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password,rounds)

        credentials.password= hash;

        Users.add(credentials)
        .then((user)=>{
            console.log(user);
            res.status(201).json({data: user})
        })
        .catch((err)=>{
            res.status(500).json({message: err.message})
        })
    }else{
        res.status(400).json({
            message:"please provide username and password."
        })
    }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (isValid(req.body)) {
      Users.findBy({ username: username })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(password, user.password)) {
  
            const token = generateToken(user);
  
            res.status(200).json({ message: "Welcome to our API" , token});
          } else {
            res.status(401).json({ message: "You shall not PASS!" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide username and password and the password shoud be alphanumeric",
      });
    }
  });
  
  function generateToken(user){
    const payload={
      subject:user.id,
      username:user.username,
      role:user.role
    }
  
    const options = {
      expiresIn : '10h'
    };
  
    const secret = secrets.jwtSecret
  
    return jwt.sign(payload,secret,options)
  }


module.exports = router;