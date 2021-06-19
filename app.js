const express = require('express')
const mongoose = require('mongoose')

const auth = require('./middlewares/auth')
const todoRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express()

const dbURI = 'mongodb+srv://jerdasi:jerjer@nodeccjeremia.pkhis.mongodb.net/to-do-list?retryWrites=true&w=majority'

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







mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {
        console.log("Database Connected")
        server.listen(3001)
    })
    .catch( (err) => {
        console.log(err)
    })

app.use(express.urlencoded({extended: true})) //MiddleWare
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.write("<html> <body> <form action='/todo' method='POST'> <input name='description'/> <button>Add</button> </form> </body> </html>")
    res.end()
})

//Routes
app.use('/todo', auth, todoRoutes) //Todo Routes
app.use('/user',userRoutes) //User Routes


// User
