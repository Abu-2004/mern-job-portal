const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true ,
    },
    company : {
        type : String,
        required : true , 
    },
    location : {
        type : String,
        required : true ,
    },
    salary : {
        type : Number,
        required : true ,
    },
    description: {
            type: String,
            required: true,
    },
    jobType : {
        type : String,
        enum : ["Full-Time", "Part-Time", "Internship", "Remote"],
        required : true,
    },
    companyLogo: {
        type: String,
        default: ""
    },
    postedBy : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
    applicants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ],
},{
    timestamps : true,
}
)



module.exports = mongoose.model("Job",jobSchema)