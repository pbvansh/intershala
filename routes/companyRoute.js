const { Router } = require("express");
const {
    getAllCompany,
    registerCompany,
    loginCompany,
    getMe
} = require('../contollers/companyController')

const {protect} = require('../middleware/protect')

const routes = Router()

routes.post('/new',registerCompany)
routes.post('/login',loginCompany)
routes.get('/',getAllCompany)
routes.post('/me',protect,getMe)

module.exports = routes