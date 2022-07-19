const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,'not user please login and try again']
    },

    companyID : {
        type: String,
        //type : mongoose.Schema.Types.ObjectId,
        ref : 'Company',
        required : [true,'no company provided']
    },

    intershipID : {
        type: String,
        //type : mongoose.Schema.Types.ObjectId,
        ref : 'Intership',
        required : [true,'no intership id is there']

    },

    statusofApplication : {
        type : String,
        enum : ['1','2','3','4'],
        default : '1',        
    }
 
},{
    timeseries:true
})


module.exports = mongoose.model('Application',applicationSchema)