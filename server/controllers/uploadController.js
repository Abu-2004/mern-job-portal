const User = require("../models/User");
const Job = require("../models/Job");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "No file uploaded"
            });

        }

        const user = await User.findById(req.user.id);

        user.resume = `/uploads/resumes/${req.file.filename}`;

        await user.save();

        res.json({

            message: "Resume uploaded successfully",

            resume: user.resume

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const uploadLogo = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "No logo uploaded"
            });

        }

        const job = await Job.findById(req.body.jobId);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        if (job.postedBy.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Not Authorized"
            });

        }

        job.companyLogo = `/uploads/logos/${req.file.filename}`;

        await job.save();

        res.json({

            message: "Logo Uploaded",

            logo: job.companyLogo

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    uploadResume,
    uploadLogo
};