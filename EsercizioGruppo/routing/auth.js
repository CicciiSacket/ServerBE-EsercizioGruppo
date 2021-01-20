var express = require("express")
const { check } = require("express-validator")
var router = express.Router()
const TokenGenerator = require("uuid-token-generator")
const Token = new TokenGenerator()

users = []

var checkToken = (req, res, next)=>{
    if (users.find(items=> items.id === req.header("id"))) {
        // res.json("loggato da prima")
        next()
    }
}

router.post('/register', ({body},res)=>{
    try {
        users.push({"id":Token.generate(),"username": String(body.username),"password": String(body.password)})
        console.log(users)
        res.json(users)
    } catch (error) {
        res.status(400)
    }
    
})

router.post('/login', ({body},res)=>{
    checkToken()
    index = users.findIndex(items=> items.username === body.username && items.password === body.password)
    if (index != -1 ) {
        users[index]= {
            "username": users[index].username,
            "password": users[index].password,
            "id":Token.generate()
        }
        console.log("porcoddio")
        res.status(201).json(users[index])    
    }
    else{  
        res.status(404).json("user not found")
    }
    
})

router.get('/logout', ({body},res)=>{
    res.connection.destroy();
    console.log("close connection")
})

module.exports = router
module.exports.users = users