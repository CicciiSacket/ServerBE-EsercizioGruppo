const express = require('express')
const router = express.Router()
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator()
var redis = require('redis')
var client = redis.createClient()
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)
users = []
router.post('/register', ({body},res) => {
        var user = {
            username:body.username,
            password:body.password,
        }
        users.push(user)
        res.json({user})
    })
router.post("/login",async ({body,headers}, res) =>{
    if(!headers.token)return res.status(401).json({message: 'token required'})
    var headerToken = headers.token
    var index =users.findIndex(item=> item.username == body.username && item.password == body.password)
    if((index != -1) && (await client.existsAsync(headerToken))){
        users[index] = {
            username: users[index].username,
            password: users[index].password,
            id: headerToken
        }
        client.expire(headerToken, 1200)
        res.json(users[index])
    }
    else if((index != -1 && !(await client.existsAsync(headerToken)))){
    var logInToken = token.generate()
        users[index] = {
            username: users[index].username,
            password: users[index].password,
            id: logInToken
        }
        await client.setAsync(logInToken, users[index].username)
        client.expire(logInToken, 1200)
        res.json(users[index])
    }
    else res.status(404).json("user not found")
})
// var checkTokenHeader = (req,res,next)=>{
//     const userToken = req.header("id")
//     if(user.find(item => item.id===userToken)){
//         next()
//     }else{
//         res.status(401).json('not valid')
//     }
// }
module.exports = router
module.exports.users = users