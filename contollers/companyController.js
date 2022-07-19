const asyncHandler = require('express-async-handler')
const Company = require('../models/companyModel')
const bc = require('bcryptjs')


const registerCompany = asyncHandler( async (req , res) =>{

    const {companyName,details,about,mobile,email,password} = req.body;
    
    const company = await Company.create({companyName,details,about,mobile,email,password})

    res.status(200).jsonp(company)


})

const loginCompany = asyncHandler( async (req,res)=>{

    const {email , password} = req.body;

    if(!email || !password){
        res.status(400)
        throw new Error('please provide email or password from middlware')
    }

    const comp = await Company.findOne({email})

    if(comp && await bc.compare(password,comp.password)){

        res.status(201).json({
            name: comp.companyName,
            email: comp.email,
            about : comp.about,
            token : comp.createJWT()
        })
    }
    else{
        res.status(400)
        throw new Error('invalid credentials from middleware')
    }

    res.status(200).json(comp)
})

const getAllCompany = asyncHandler( async (req,res)=>{
    const comps = await Company.find().select("-password")
    res.status(200).json(comps)
})

const getMe = asyncHandler( async (req,res)=>{
    const comps = await Company.findById(req.user.id).select("-password")
    res.status(200).json(comps)
})

module.exports = {
    registerCompany,
    getAllCompany,
    loginCompany,
    getMe,
}