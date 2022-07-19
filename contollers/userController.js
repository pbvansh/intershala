const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const asyncHandler = require('express-async-handler');
const bc = require('bcryptjs')

//POST signup user
const registerUser = asyncHandler(async(req, res) => {

    const  { name ,email , mobileNo , password} = req.body;

    if(!email || !password) {
        res.status(400).json("please enter valid email or password")
    }

    const user = await User.create({name,email,mobileNo,password})
    res.status(300).json(user)
})

//
const getUser = asyncHandler(async(req, res) => {
    
    const id = req.params.id;
    if(!id){
        res.status(400).json("id not found")
    }

    const user = await User.findById(id).select('-password')
    user ? res.status(200).json(user) : res.status(400).json(`no user with id ${id}`) 
})

const getAllUser = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const loginUser = asyncHandler(async(req, res) => {

    const {email , password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('please enter correct user email or passwowrd')
    }

    const user = await User.findOne({email})

    if(user && await bc.compare(password,user.password))
    {
        res.status(201).json({
            message : "login succsefully",
            name : user.name,
            email : user.email,
            mobile_no : user.mobileNo,
            token : user.createJWT(),
        })
    }
    else{
        res.status(400)
        throw new Error('invalid crediantioals')
    }

    res.status(200).json({email,password})
})

const updateUser =asyncHandler(async(req,res) => {
    const data = req.body;
    const id = req.user.id;
    if(req.body.password){
        const salt = await bc.genSalt(10);
        req.body.password = await bc.hash(req.body.password,salt)
    }
    const user = await User.findByIdAndUpdate(id,data,{new : true})
    res.status(202).json({msg : 'user updated' , ...user._doc});
})

const getMe = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
})


const getMyApplications = asyncHandler(async(req, res) => {

    const userId = req.user.id;
    const application = await Application.find({userId});
    res.status(200).json(application)
   
})

module.exports = {
    getUser,
    getAllUser,
    loginUser,
    registerUser,
    updateUser,
    getMe,
    getMyApplications,
    
    
}