const asyncHandler = require('express-async-handler')
const Application = require('../models/applicationModel')


const getAll= asyncHandler(async(req,res) =>{
    const applications = await Application.find()
    res.status(200).json(applications)
})

const getStaticApplication = asyncHandler( async(req,res)=>{
    const application = await Application.findById(req.params.id)
    if(!application){
        res.status(400)
        throw new Error(`No Application found with id : ${req.params.id}`)
    }
    res.status(200).json(application)
})

const createApplication = asyncHandler( async(req,res)=>{
    const {companyID,intershipID} = req.body;
    const application = await Application.create({
        userID : req.user.id,
        companyID,
        intershipID,
    })
    
    res.status(201).json(application);
})


const getApplication = asyncHandler( async(req,res)=>{
    const application = await Application.find({userID : req.user.id})
    if(!application){
        res.status(400)
        throw new Error(`No  Application found with id : ${req.params.id}`)
    }
    res.status(200).json(application)
})

module.exports = { 
    getAll,
    getStaticApplication,
    createApplication,
    getApplication
}
