const express = require('express')
const auth = require('../middlewares/auth')
const Description = require('../models/description')

const router = express.Router()

router.get('/', (req, res) => {
    Description.find()
        .then( (result) => {
            res.json(result)
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})

router.post('/', (req, res) => {
    const description = new Description(req.body)
    description.save()
        .then( (result) => {
            res.redirect('/todo')
        })
        .catch( (err) => {
            console.log(err)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Description.findById(id)
        .then((result) => {
            res.json(result)
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})

router.delete('/todo/:id', (req, res) => {
    const id = (req.params.id).toString()
    Description.findByIdAndDelete( {"_id": id} )
        .then((result) => {
            res.status(200).json([]);
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})

module.exports = router