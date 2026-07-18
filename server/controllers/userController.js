const User = require("../models/User")

const getProfile = async (req,res) => {
    try{

        const user = await User.findById(req.user.id)
            .select("-password")
        
        res.json(user)

    } catch (error) {

        res.status(500).json({
            message : error.message
        })
    }
};


const getSavedJobs = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .populate("savedJobs");

        res.json(user.savedJobs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getProfile,
    getSavedJobs
}