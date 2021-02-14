const router = require('express').Router();
const restrictedMiddleware = require('../auth/restricted-middleware');
const Users = require('./users-model');


router.get('/',restrictedMiddleware, function getAllUsers(req,res){
    Users.find()
    .then((users)=>{
        res.status(200).json(users)
    })
    .catch((err)=>{
        res.status(500).json({error:err.message})
    })
})

module.exports = router;