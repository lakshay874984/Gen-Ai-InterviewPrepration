const pdfjsLib = require("pdfjs-dist/legacy/build/pdf"); // ✅ NEW
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interview.model");


// ✅ Helper function to extract text from PDF
async function extractTextFromPDF(buffer) {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items.map(item => item.str).join(" ");
        text += pageText + "\n";
    }

    return text;
}


// =============================
// Generate Interview Report
// =============================
async function generateInterviewReportController(req, res) {
    try {
        const resumeFile = req.file;
        const { selfDescription, jobDescription } = req.body;

        let resumeContent = "";

        // ✅ Use pdfjs instead of pdf-parse
        if (resumeFile) {
            resumeContent = await extractTextFromPDF(resumeFile.buffer);
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        }).save();

        res.status(200).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Error generating interview report:", error);
        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}


// =============================
// Get Report by ID
// =============================
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching interview report",
            error: error.message
        });
    }
}


// =============================
// Get All Reports
// =============================
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching interview reports",
            error: error.message
        });
    }
}


// =============================
// Generate Resume PDF
// =============================
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        const { resume, jobDescription, selfDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("Error generating resume PDF:", error);
        res.status(500).json({
            message: "Failed to generate resume PDF",
            error: error.message
        });
    }
}


module.exports = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
};