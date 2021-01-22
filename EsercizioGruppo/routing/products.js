const express =  require('express')
const bodyParser = require('body-parser')
const router = express.Router()
module.exports = router
const products = require('../products.json')
const {param} = require('express-validator')
const {checkTokenHeader,errorHandlers} = require('../middlewere/middlewere.js')

router.get('/',checkTokenHeader,(_,res) =>{res.json(products)})

router.get('/:id',param('id').toInt().isInt(),errorHandlers,checkTokenHeader,({params:{id}}, res) =>{
    const product = products.find(({ID}) => ID === Number(id))
    if (product) return res.json(product)
    res.status(404).json({message: 'product not found'})
})
