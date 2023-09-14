const express = require("express");
const attendanceController = require("../Controllers/attendanceController");
const authController = require("../Controllers/authController");
const surveyFormController = require("../Controllers/surveyFormController");
const workerController = require("../Controllers/workerController");

// Middlewares imports
const { checkJwt } = require("../Middlewares/authMiddlewares");
const { imgUpload } = require("../Middlewares/imageUploadMiddlewares");

const router = express.Router();
// login,logout routers
router.post("/admin/login", authController.adminLogin);
router.post("/worker/login", authController.workerLogin);
router.get("/checkJWT", checkJwt, authController.checkValidJWT);  


//Worker routes
router.post("/worker/register", workerController.saveWorker);
router.get("/worker/get-all-worker", workerController.getAllWorkers);
router.get("/worker/get-worker-by-id/:id", workerController.getWorkerById);
router.patch("/worker/update-worker/:id", workerController.updateWorker);
router.delete("/worker/delete-worker/:id", workerController.deleteWorker);

//worker attendance
router.post("/attendance/add-worker-attendance", imgUpload.single('attendanceSelfie'), attendanceController.saveAttendance)
router.get("/attendance/get-all-attendance", attendanceController.getAllAttendance)
router.get("/attendance/get-attendance-by-username/:id", attendanceController.getAttendanceByUsername)

//worker survey form
router.post("/survey/add-worker-survey", imgUpload.fields([{ name: 'shopPicture', maxCount: 1 }, { name: 'shopVisitingCart', maxCount: 1 }]), surveyFormController.saveSurveyForm)
router.get("/survey/get-all-survey", surveyFormController.getAllSurveyForm);
router.get("/survey/get-survey-by-username/:id", surveyFormController.getSurveyFormByUsername);


module.exports = router;