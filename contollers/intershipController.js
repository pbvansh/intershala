const Intership = require('../models/intershipModel')
const asyncHandler = require('express-async-handler')

const getAllIntership = asyncHandler(async(req,res) =>{
    const interships  = await Intership.find();
    res.status(200).json(interships)
})

const getMyIntership = asyncHandler(async(req,res) =>{
    const interships  = await Intership.findOne({companyID:req.user.id});
    res.status(200).json(interships)
})

const createIntership =asyncHandler(async(req,res) =>{

    const {
        position,
        typeofIntership,
        stipend,
        duration,
        startDate,
        applyBy
    } = req.body;

    const intership = await Intership.create({
        companyID:req.user.id,
        position,
        stipend,
        duration,
        startDate,
        applyBy
    })
    res.status(200).json(intership)
})


const deleteIntership = asyncHandler(async(req,res) =>{
    const intership  = await Intership.findById(req.params.id);
    if(!intership){
        res.status(400)
        throw new Error(`no intership with id : ${req.params.id}`)
    }
        await Intership.findByIdAndRemove(req.params.id)
        res.status(200).json(`inntership deleted with id ${req.params.id}`)
})

module.exports = { 
    getAllIntership,
    createIntership,
    getMyIntership,
    deleteIntership,
}