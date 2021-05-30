const express = require('express')
const mongoose = require('mongoose')
const Description = require('./models/description')
const cors = require('cors')
const { ObjectID } = require('bson')

const app = express()
const dbURI = 'mongodb+srv://jerdasi:jerjer@nodeccjeremia.pkhis.mongodb.net/to-do-list?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {
        console.log("Database Connected")
        app.listen(3001)
    })
    .catch( (err) => {
        console.log(err)
    })

app.use(express.urlencoded({extended: true})) //MiddleWare
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    // res.write("<html> <body> <form action='/todo' method='POST'> <input name='description'/> <button>Add</button> </form> </body> </html>")
    res.end()
})

app.get('/todo', (req, res) => {
    Description.find()
        .then( (result) => {
            res.json(result)
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})

app.post('/todo', (req, res) => {
    const description = new Description(req.body)
    description.save()
        .then( (result) => {
            res.redirect('/todo')
        })
        .catch( (err) => {
            console.log(err)
        })
})

app.get('/todo/:id', (req, res) => {
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

app.delete('/todo/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    
    Description.findByIdAndDelete(id)
        .then((result) => {
            res.json(result)
            res.end()
        })
        .catch( (err) => {
            console.log(err)
        })
})


