const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { getProfile , getSavedJobs } = require("../controllers/userController");

router.get("/profile",protect,getProfile);
router.get("/saved-jobs", protect, getSavedJobs);

module.exports = router