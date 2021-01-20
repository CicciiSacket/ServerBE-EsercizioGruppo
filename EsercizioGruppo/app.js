console.log('Server exe [esercizio 20-01-21]')

const express =  require('express')
const bodyParser = require ('body-parser')
const app = express()
const { body, validationResult } = require('express-validator');

const redis = require('redis');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3005)

const client = redis.createClient()

client.on("error" ,(error)=>{
    console.log(error.message)
})
client.on("ready",() =>{
    console.log('client connected and ready to use ')
})

client.set("user","utente")// chiave valore
client.get("user", redis.print)// viene stampato il valore

client.set("password","passw")
client.get("password", redis.print)


const index = require('./routing/auth')
app.use('/',index)
