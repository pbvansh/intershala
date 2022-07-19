const express = require('express')
const routes = express.Router();
const {
    getAll,
    getApplication,
    getStaticApplication,
    createApplication,
} = require('../contollers/applicationController');
const { protect } = require('../middleware/protect');

routes.get('/',getAll)
routes.get('/:id',getStaticApplication)
routes.post('/my',protect,getApplication)
routes.post('/create',protect,createApplication)

module.exports = routes