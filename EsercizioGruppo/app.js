console.log('Server exe [esercizio 20-01-21]')

const express =  require('express')
const bodyParser = require ('body-parser')

const index = require('./routing/auth')
const router = require('./routing/products')
const redis = require('redis');
const client = redis.createClient()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3005)


app.use('/auth',index)
app.use('/products',router)

client.on("error" ,(error)=>{
    console.log(error.message)
})
client.on("ready",() =>{
    console.log('client connected and ready to use ')
})

// client.flushdb( function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });