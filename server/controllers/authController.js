const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Register user 
const registerUser = async (req, res) => {

    try{

        const { fullName, email, password, phone, location } = req.body 

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({
                message : "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({

            fullName,
            email,
            password : hashedPassword ,
            phone,
            location

        });

        res.status(201).json({

            message: "User Registered Successfully",

            user

        });

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }

}

//Login user
const loginUser = async (req,res) => {

    try{
        const {email , password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({
                message : "Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({
                message : "Invalid Email or Password"
            })
        }

        const token = jwt.sign({
            
            id : user._id,
            email : user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        } );

        res.json({
            message : "Login Successfully",
            token,
            user
        })

    } catch (error) {

        res.status(500).json({
            message : error.message
        })
    }

    

}

module.exports = {
    registerUser,
    loginUser
};