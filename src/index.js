require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const cors = require('cors')

//Database setup
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('mongodb connected'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(routes)

app.get('/', (req, res) => {
    return res.send('nossa chega de mandar oi')
})

app.listen(5655, () => console.log('rodando'))