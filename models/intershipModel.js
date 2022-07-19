const mongoose = require('mongoose')

const intershipSchema = new mongoose.Schema({

    companyID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Company',
    },

    position : {
        type : String,
        require : [true,'please add the position'],
        
    },

    typeofIntership : {
        type : String,
        enum : ['Work From Home','office'],
        default : 'office',
    },

    isPaid : {
        type : Boolean,
        default : true,
        
    },

    stipend :{
        type : Number,
    } ,
        
    duration : {
        type :  String ,
        require : [true,'please add the duration'],
    },

    applicants : {
        type :  Number,
    },

    startDate: {
        type :  String,
        require : [true,'please add the startDate'],
    },

    applyBy: {
        type :  String,
        require : [true,'please add the applyBy'],
    },

},{
    timestamps : true
})


module.exports = mongoose.model('Intership',intershipSchema)