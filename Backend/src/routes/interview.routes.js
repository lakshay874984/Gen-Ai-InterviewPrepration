const express = require('express');
const interviewRouter = express.Router();
const { authUser } = require("../middlewares/auth.middleware")

const { upload } = require("../middlewares/file.middleware")
const  interviewController  = require("../controllers/interview.controller")
/**
 * @route POST /api/interview
 * @desc Generate an interview preparation report based on the candidate's resume, self-description, and job description
 * @access Private (requires authentication)
 */

interviewRouter.post("/", authUser ,upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */

interviewRouter.get("/", authUser, interviewController.getAllInterviewReportsController)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter;