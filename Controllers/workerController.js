const Attendance = require("../Models/attendance");
const Worker=require("../Models/worker");
const { hashPassword } = require("../Util/HashPassword");
const fs = require('fs');
const SurveyForm = require("../Models/surveyForm");

class WorkerController
{
    async getAllWorkers(req, res)
    {
        try
        {
            res.status(200).send(await Worker.find({}));
        }
        catch(err)
        {
            console.log(err)
        }
    }
    async getWorkerById(req, res)
    {
        try
        {
            const worker= await Worker.findOne({_id: req.params.id})
            // console.log(worker)
            res.status(200).send(worker);
        }
        catch(err)
        {
            // console.log(err)
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
    async saveWorker(req, res)
    {
        try
        {
            const alreadyWorker=await Worker.findOne({ username: req.body.username})
            if(!alreadyWorker)
            {
                const worker=new Worker(
                {
                    username: req.body.username,
                    contact: req.body.contact,
                    password: hashPassword(req.body.password)
                    // password: req.body.password
                })
                await worker.save();
                res.send({ status: "success", message: "Worker Added" });
            }
            if (alreadyWorker) 
            {
                res.send({ status: "failed", message: "Worker Already Existed" });
            }
        }
        catch(err)
        {
            // console.log(err);
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
    async updateWorker(req, res)
    {
        try
        {
            const updateWorker= await Worker.findOneAndUpdate({_id: req.params.id},
                {
                    $set:
                    {
                        username: req.body.username,
                        contact: req.body.contact,
                        // password: req.body.password
                        password: hashPassword(req.body.password)
                    },
                    $inc:
                    {
                        __v: 1,
                    },

                },
                { new: true }
            )
            if (!updateWorker) return res.send({ status: "failed", message: "Worker Not Updated" });
            return res.send({ status: "success", message: "Worker Updated" });
        }
        catch(err)
        {
            // console.log(err)
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
    async deleteWorker(req, res)
    {
        // console.log("hit")
        try
        {
            const findWorker=await Worker.findOne({_id: req.params.id})
            // console.log(findWorker.username);
            const findAttendance= await Attendance.find({username: findWorker.username})
            // console.log(findAttendance);
            if(findAttendance&&findAttendance.length>0)
            {
                findAttendance.map(attendance=>
                {
                    // console.log(attendance.selfie)
                    fs.unlinkSync(attendance.selfie)
                })
            }
            const attendanceDelete=await Attendance.deleteMany({username: findWorker.username})

            const findSurvey=await SurveyForm.find({username: findWorker.username})
            if(findSurvey&&findSurvey.length>0)
            {
                findSurvey.map(survey=>
                {
                    // console.log(survey.shopPicture);
                    // console.log(survey.shopVisitingCart);
                    
                    fs.unlinkSync(survey.shopPicture)
                    fs.unlinkSync(survey.shopVisitingCart)
                })
            }
            const surveyDelete=await SurveyForm.deleteMany({username: findWorker.username})
            // console.log(AttendanceDelete);
            const result = await Worker.deleteOne({ _id: req.params.id });
            if (result.deletedCount > 0) {
                res.send({ status: 'success', message: 'Worker Deleted' });
            } else {
                res.send({ status: 'failed', message: 'Worker Not Deleted' });
            }
        }
        catch(err)
        {
            // console.log(err);
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
}
module.exports = new WorkerController();