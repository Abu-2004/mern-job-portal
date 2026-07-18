require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname, "uploads")));

app.get("/" , (req,res) => {
    res.send("Welcome to Job Portal API")
});

const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server running on ${PORT}`)
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/jobs" , jobRoutes);
app.use("/api/upload", uploadRoutes);