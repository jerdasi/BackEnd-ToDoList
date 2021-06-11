const express = require('express')
const User = require('../models/users')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', auth, (req, res) => {
    User.find()
        .then( (result) => {
            res.json(result)
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})

router.post('/', (req, res, next) => {
    const username = req.headers.username
    const password = req.headers.password
    
    User.findOne({})
        .then(function(result){
            if(result != null){
                auth(req, res, next)
            } else{
                next()
            }
        })
},(req, res) => {
    const user = new User(req.body)
    user.save()
        .then( (result) => {
            res.json(result)
        })
        .catch( (err) => {
            console.log(err)
        })
})

router.delete('/:id', auth, (req, res) => {
    const id = (req.params.id).toString()
    User.count({}, (err, count) => {
        if(count > 1){
            User.findByIdAndDelete( {"_id": id} )
                .then((result) => {
                    res.status(200).json([]);
                    res.redirect('/user')
                    res.end()
                })
                .catch( (err) => {
                    console.log(err)
                })
        } else {
            res.json({"pesan": "Gak Boleh We!"})
        }
    })
    
})

module.exports = router