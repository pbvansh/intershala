const mongoose = require('mongoose');
const bc = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({

    profile : {
        type : String,
    },

    name : {
        type : String,
        required : [true, "please add your name"],
        min : 2,
        max : 20,
    },

    email : {
        type : String,
        unique : true,
        required : [true, "please add your email"],
        max : 50,
    },

    mobileNo : {
        type : Number,
        unique : true,
        required : [true, "please add your mobileNo"],
        min : 10,
    },

    password : {
        type : String,
        required : [true, "please add your password"],
        min : 8,
        max : 20,
    },

    isAdmin : {
        type : Boolean,
        default : false,
    },

    loginWith : {
        type : String,
        //enum : ['idPassword','google',facebook,'github','linkedin'],
        default :'idPassword',
    },
},{
    timestamps : true
})

userSchema.pre('save', async function(){
    const salt = await bc.genSalt(10)
    this.password = await bc.hash(this.password,salt)
})

userSchema.methods.createJWT = function(){
    return JWT.sign( {id:this._id, name:this.name, email:this.email},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_LIFE
    }) 
}

module.exports = mongoose.model('User',userSchema);