var redis = require('redis')
var client = redis.createClient()
const {validationResult} = require('express-validator')
const bluebird = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype)

var checkTokenHeader = async (req,res,next)=>{
    const userToken = req.header("authorization")
    if(!userToken) res.status(400).json({message:'token not valid'})
    if(await client.getAsync(userToken)){
        next()
    }else{
        res.status(401).json('not valid')
    }
}

var errorHandlers = (req, res, next) => { 
    const errors = validationResult(req) 
    if(!errors.isEmpty()){ 
        return res.status(400).json({errors} )
    } else {
        next();
    }
}


module.exports = {checkTokenHeader,errorHandlers}