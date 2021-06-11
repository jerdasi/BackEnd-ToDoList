const mongoose = require('mongoose')
// const { db } = require('../models/description')
const Description = require('../models/description')
const User = require('../models/users')

module.exports = function(req, res, next){
    const username = req.headers.username
    const password = req.headers.password
    
    User.findOne({username: username, password: password})
        .then(function(result){
            if(result){
                next()
            } else{
                res.send(401)
            }
        })
    
}