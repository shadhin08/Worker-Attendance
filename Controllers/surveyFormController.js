const SurveyForm = require("../Models/surveyForm");

class surveyFormController
{
    async saveSurveyForm(req, res)
    {
        // console.log("hit");
        if(req.files)
        {
            console.log(req.files);
            const surveyForm=new SurveyForm(
            {
                username: req.body.username,
                shopName: req.body.shopName,
                shopAddress: req.body.shopAddress,
                shopCategory: req.body.shopCategory,
                shopWonerName: req.body.shopWonerName,
                shopWonerContact: req.body.shopWonerContact,
                vehicleCategory: req.body.vehicleCategory,
                seelingOilsfromShop: req.body.seelingOilsfromShop,
                seelingMotulOil: req.body.seelingMotulOil,
                distributorName: req.body.distributorName,
                distributorIntrest: req.body.distributorIntrest,
                shopPicture: req?.files?.shopPicture[0]?.destination+'/'+req?.files?.shopPicture[0]?.filename,
                shopVisitingCart: req?.files?.shopVisitingCart[0]?.destination+'/'+req?.files?.shopVisitingCart[0]?.filename
            })
            const result = surveyForm.save();
            return res.send({ status: "success", message: "Survey Form Added" });
        }
        else 
        {
            return res.send({ status: "failed", message: "Image Not Uploaded" });
        }
    }
    async getAllSurveyForm(req, res)
    {
        // console.log("hit survey");
        try
        {
            res.status(200).send( await SurveyForm.find({}))
        }
        catch(err)
        {
            // console.log(err);
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
    async getSurveyFormByUsername(req, res)
    {
        try
        {
            const userSurvey=await SurveyForm.find({username: req.params.id})
            res.status(200).send(userSurvey);
        }
        catch(err)
        {
            // console.log(err)
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
        
    }
}
module.exports=new surveyFormController();