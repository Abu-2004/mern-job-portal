const mangoose = require("mongoose")

const connectDB = async () => {
    try {
        await mangoose.connect(process.env.MONGO_URI);
        // console.log(process.env.MANGO_URI)
        console.log("MangoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;