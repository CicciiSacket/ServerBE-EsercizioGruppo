var express = require("express")
var router = express.Router()
module.exports = router

var users = [{"username": "prova","password": "prova"}]
router.post('/register', ({body},res)=>{
    newUser = {"username": String(body.username),"password": String(body.password)}
    users.push({newUser})
    console.log(newUser)
    res.json(newUser)
})

router.get('/login', ({body},res)=>{
    if (String(body.username) === "pippo" && String(body.password) === "1234") {
        console.log(users)
        res.json(users)    
    }
    else{  
        res.error(JSON.stringify)
    }
})