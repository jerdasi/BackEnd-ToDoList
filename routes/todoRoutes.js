const express = require('express')
const app = express()

const auth = require('../middlewares/auth')
const Description = require('../models/description')

const router = express.Router()

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*"}});
io.on('connection', (socket) => { 
    console.log("User Connected" + socket._id)

    socket.on('todo', (data) => {
        io.sockets.emit('todo', data)
    })

    socket.on('delete', (data) => {
        io.sockets.emit('delete', data)
    })
 });

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
            res.json(result)
        })
        .catch( (err) => {
            console.log(err)
        })
})


router.delete('/:id', (req, res) => {
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