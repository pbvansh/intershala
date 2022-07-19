const asyncHandler = require('express-async-handler')
const JWT = require('jsonwebtoken')
const Company = require('../models/companyModel')
const User =require('../models/userModel')
require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {

    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(' ')[1]
            const payload = await JWT.verify(token, process.env.JWT_SECRET)

            if(req.baseUrl.startsWith('/api/company') 
               || req.baseUrl.startsWith('/api/intership') 
            ){
                req.user = await Company.findById(payload.id).select('-password')
            }
            else if(req.baseUrl.startsWith('/api/user')
                    || req.baseUrl.startsWith('/api/application')
            ){
                req.user = await User.findById(payload.id).select('-password')
            }

            next()

        }

    } catch (err) {
        throw new Error('something was wrong')
    }

    if(!token){
        res.status(400).json('no token ')
    }

})

module.exports = {
    protect
}