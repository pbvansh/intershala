const express = require('express')
const routes = express.Router()
const {
    getAllIntership,
    createIntership,
    getMyIntership,
    deleteIntership,
} = require('../contollers/intershipController')
const { protect } = require('../middleware/protect')

routes.get('/all',protect,getAllIntership)
routes.delete('/delete/:id',protect,deleteIntership)
routes.post('/create',protect,createIntership)
routes.post('/',protect,getMyIntership)

module.exports = routes