const express = require('express')
const router = express.Router()
const {body,validationResult} = require('express-validator')
const {checkTokenHeader} = require('../middlewere/middlewere.js')
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator()
var redis = require('redis')
var client = redis.createClient()
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)

users = []

router.post('/register',body('username').isEmail(),body('password').isLength({ min: 5 }), ({body:{username, password}},res) => {
    var user = {
        username:username,
        password:password
    }
    users.push(user)
    res.json({user})
})
router.post("/login",async ({body: {username, password},headers:{authorization}}, res) =>{
    var index =users.findIndex(item=> item.username == username && item.password == password)
    if(index == -1) return res.status(404).json("user not found")
    users[index] = {username,password}
    if((authorization) && (await client.existsAsync(authorization))){
        users[index] = {...users[index], authorization}
        client.expire(authorization, 1200)
        res.json(users[index])  
    }
    else{
        var logInToken = token.generate()
        users[index] = {...users[index], authorization: logInToken}
        await client.setAsync(logInToken, username)
        client.expire(authorization, 1200)
        res.status(201).json(users[index])
    }
})

router.delete("/logout",checkTokenHeader, async ({headers:{authorization}}, res) =>{
    await client.delAsync(authorization)
    res.status(200).json({message:"successfully logout"})
})

module.exports = router
module.exports.users = users