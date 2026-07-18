const Job = require("../models/Job")
const User = require("../models/User");
const { findByIdAndUpdate } = require("../models/User")

const createJob = async (req,res) => {

    try {
        const{ 
                title,
                company,
                location,
                salary,
                description,
                jobType
            } = req.body

        const job = await Job.create({
                title,
                company,
                location,
                salary,
                description,
                jobType,
                postedBy : req.user.id
        })

        res.status(201).json(job);

    } catch (error) {

        res.status(500).json({
            message : error.message
        })

    }

}

const getAllJobs = async (req,res) => {

    try{
        const page = Number(req.query.page) || 1;

        const limit = 10;

        const skip = (page - 1) * limit;

        const jobs = await Job.find()

            .populate("postedBy", "fullName email")

            .skip(skip)

            .limit(limit);

        res.status(200).json(jobs);

    } catch (error) {

        res.status(500).json({
            message : error.message
        })
    }

};

const getJobById = async (req,res) => {
    try{

        const job = await Job.findById(req.params.id)
                    .populate("postedBy", "fullName email")

        if (!job) {
            res.status(404).json({
                message : "Job Not Found"
            })
        }

        res.json(job)

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

const updateJob = async (req,res) =>{
    try{
        const job = await Job.findById(req.params.id)

        if (!job) {
            res.json({
                message : "Job Not Found"
            })
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not Authorized"
            })
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,

            req.body,

            {
                new : true,
                runValidators : true
            }

        )

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }

}

const deleteJob = async (req,res) => {
    try{
        const job = await Job.findById(req.params.id)

        if (!job) {
            res.status(404).json({
                message : "Job Not Found"
            })
        }

        if (job.postedBy.toString() !== req.user.id){

            return res.status(403).json({
                message: "Not Authorized"
            })
        }

        await Job.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message: "Job Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }

}


const searchJobs = async (req, res) => {

    try {

        const { keyword, location, company, jobType } = req.query;

        let query = {};

        if (keyword) {
            query.title = {
                $regex: keyword,
                $options: "i"
            };
        }

        if (location) {
            query.location = location;
        }

        if (company) {
            query.company = company;
        }

        if (jobType) {
            query.jobType = jobType;
        }

        const jobs = await Job.find(query)
            .populate("postedBy", "fullName email");

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getMyJobs = async (req, res) => {

    try {

        const jobs = await Job.find({
            postedBy: req.user.id
        }).populate("postedBy", "fullName email");

        res.status(200).json(jobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const applyJob = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job Not Found"
            });
        }

        if (job.applicants.includes(req.user.id)) {

            return res.status(400).json({
                message: "Already Applied"
            });

        }

        job.applicants.push(req.user.id);

        await job.save();

        res.status(200).json({
            message: "Applied Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const saveJob = async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (user.savedJobs.includes(req.params.id)) {

            return res.status(400).json({
                message: "Job Already Saved"
            });

        }

        user.savedJobs.push(req.params.id);

        await user.save();

        res.status(200).json({
            message: "Job Saved Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const jobs = await Job.find({
            postedBy: req.user.id
        });

        const totalJobs = jobs.length;

        let totalApplicants = 0;

        jobs.forEach(job => {

            totalApplicants += job.applicants.length;

        });

        res.status(200).json({

            totalJobs,

            totalApplicants,

            jobs

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getApplicants = async (req, res) => {

    try {

        const job = await Job.findById(req.params.id)

        .populate(

            "applicants",

            "fullName email"

        );

        if (!job) {

            return res.status(404).json({

                message:"Job Not Found"

            });

        }

        if (job.postedBy.toString() !== req.user.id) {

            return res.status(403).json({

            message: "Not Authorized"});

        }

        res.status(200).json(

            job.applicants

        );

    } catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobs,
    getMyJobs,
    applyJob,
    saveJob,
    getDashboard,
    getApplicants
    
}