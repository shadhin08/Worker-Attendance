const Attendance=require('../Models/attendance');

class attendanceController
{
    async saveAttendance(req, res)
    {
        // console.log("hit");
        if(req.file)
        {
            const attendance=new Attendance(
            {
                username: req.body.username,
                workArea: req.body.workArea,
                selfie: req?.file?.destination + '/' + req?.file?.filename
            })
            const result = attendance.save();
            return res.send({ status: "success", message: "Attendance Added" });
        }
        else 
        {
            return res.send({ status: "failed", message: "Image Not Uploaded" });
        }
    }
    async getAllAttendance(req, res)
    {
        // console.log("hit att")
        try
        {
            res.status(200).send( await Attendance.find({}))
        }
        catch(err)
        {
            // console.log(err);
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
    async getAttendanceByUsername(req, res)
    {
        try
        {
            const userAttendances= await Attendance.find({username: req.params.id});
            res.status(200).send(userAttendances);
        }
        catch(err)
        {
            // console.log(err)
            return res.send({ status: "failed", message: "Something Went To Wrong...!" });
        }
    }
}
module.exports=new attendanceController();