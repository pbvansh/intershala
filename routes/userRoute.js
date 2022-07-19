const express= require('express');
const routes = express.Router();
const { protect } = require('../middleware/protect');
const { 
    getUser,
    loginUser,
    registerUser,
    getAllUser,
    updateUser,
    getMe,
    getMyApplications,
     } = require("../contollers/userController");


// Add routes
routes.post('/register',registerUser)
routes.post('/login',loginUser);
routes.get('/',getAllUser);
routes.get('/me',protect,getMe)
routes.get('/:id',protect,getUser)
routes.put('/update',protect,updateUser)
routes.post('/myapplication',protect,getMyApplications)

module.exports = routes;
