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
router.post("/login",async ({body: {username, password},headers:{authorization}}, res) =>{
    if(!authorization)return res.status(401).json({message: 'token required'})
    var index =users.findIndex(item=> item.username == username && item.password == password)
    if(index == 1) return res.status(404).json("user not found")
    users[index] = {username,password}
    if((await client.existAsync(authorization))){
        users[index] = {...users[index], authorization}
        client.expire(authorization, 1200)
        res.json(users[index])
    }
    else{
        var logInToken = Token.generate
        users[index] = {...users[index], authorization: logInToken}
        await client.setAsync(logInToken, username)
        client.expire(authorization, 1200)
        res.json(users[index])
    }
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