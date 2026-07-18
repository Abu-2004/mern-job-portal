const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const   {createJob , 
        getAllJobs ,
        getJobById ,
        updateJob ,
        deleteJob ,
        searchJobs ,
        getMyJobs ,
        applyJob ,
        saveJob,
        getDashboard,
        getApplicants} = require("../controllers/jobController");

router.post("/",protect,createJob);
router.get("/",getAllJobs);
router.get("/search", searchJobs);
router.get("/my-jobs", protect, getMyJobs);
router.get("/dashboard", protect, getDashboard);
router.get("/:id",getJobById)
router.put("/:id",protect,updateJob)
router.delete("/:id",protect,deleteJob)
router.post("/:id/apply", protect, applyJob);
router.post("/:id/save", protect, saveJob);
router.get("/:id/applicants",protect,getApplicants);



module.exports = router;

