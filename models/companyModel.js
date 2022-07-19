const mongoose = require('mongoose');
const bc = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const companySchema = new mongoose.Schema({
    companyName : {
        type : String,
        unique : true,
        required : [true,'please add the comany name']
    },

    details : {
        type : String,
        required : [true,'please add the comany details']
    },

    about : {
        type : String,
        required : [true,'please provide about information']
    },

    mobile : {
        type : Number,
        unique : true,
        required : [true,'please provide mobile number']
    },

    email : {
        type : String,
        unique : true,
        required : [true,'please add compnay email address']
    },
    
    password : {
        type : String,
        required : [true,'please add your password']
    },

},{
    timestamps:true
})

companySchema.pre('save', async function(){

     const salt = await bc.genSalt(10);
     this.password = await bc.hash(this.password,salt)

})

companySchema.methods.createJWT = function(){
    return JWT.sign( {id:this._id, name:this.name, email:this.email},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_LIFE
    })
}

module.exports = mongoose.model('Company',companySchema)