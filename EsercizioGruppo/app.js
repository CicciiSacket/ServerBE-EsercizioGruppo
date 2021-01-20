console.log('Server exe [esercizio 20-01-21]')

const express =  require('express')
const bodyParser = require ('body-parser')
const app = express()
const { body, validationResult } = require('express-validator');
const index = require('./routing/auth')
const {users} = require('./routing/auth')
const redis = require('redis');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3005)
const client = redis.createClient()
app.use('/',index)

client.on("error" ,(error)=>{
    console.log(error.message)
})
client.on("ready",() =>{
    console.log('client connected and ready to use ')
})


// client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });