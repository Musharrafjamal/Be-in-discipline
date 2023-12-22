const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
require('dotenv').config();



const app = express()

//Middlewares

app.use(bodyParser.json());
app.use(cors())

//GET home-page

app.get('/', (req, res) =>{
    res.send('Hello')
})



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})