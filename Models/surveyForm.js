const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const surveyFormSchema= new Schema({
    username:
    {
        type: String,
        required: true
    },
    shopName:
    {
        type: String,
        // required: true
    },
    shopAddress:
    {
        type: String,
        // required: true
    },
    shopCategory:
    {
        type: String,
        // required: true
    },
    shopWonerName:
    {
        type: String,
        // required: true
    },
    shopWonerContact:
    {
        type: Number,
        // required: true
    },
    vehicleCategory:
    {
        type: String,
        // required: true
    },
    seelingOilsfromShop:
    {
        type: String,
        // required: true
    },
    seelingMotulOil:
    {
        type: String,
        // required: true
    },
    distributorName:
    {
        type: String
    },
    distributorIntrest:
    {
        type: String
    },
    shopPicture:
    {
        type: String,
        required: true
    },
    shopVisitingCart:
    {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
})
module.exports=mongoose.model('SurveyForm', surveyFormSchema);