const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const uploadResumeMiddleware = require("../middleware/uploadResume");
const uploadLogoMiddleware = require("../middleware/uploadLogo");



const { uploadResume: uploadResumeController } = require("../controllers/uploadController");
const {uploadLogo: uploadLogoController} = require("../controllers/uploadController");


router.post(
    "/resume",
    protect,
    uploadResumeMiddleware.single("resume"),
    uploadResumeController
);
router.post(
    "/logo",
    protect,
    uploadLogoMiddleware.single("logo"),
    uploadLogoController
);

module.exports = router;