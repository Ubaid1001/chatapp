import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../lib/utils.js";
import { sendEmail } from "../emails/emailHandler.js";
import cloudinary from "../lib/cloudinary.js";


// signup ka kaam
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All feilds are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 chracters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email fromat" })
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exist" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture
            });
            try {
                await sendEmail(savedUser.email, savedUser.fullName)
            } catch (error) {
                console.error("Error in sending email: ", error);
            }

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signUp Controller: ", error);
        res.status(500).json({ message: "Internal server error" })
    }
};
// login ka kaam
export const signin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.error("Error in login controller", error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// logout ka kaam
export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "logged user successfully" })
};

export const updateProfile = async (req, res) => {
    try {

        const { profilePicture } = req.body;
        if (!profilePicture) res.status(400).json({ message: "profile image is required" })

        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePicture);

        const updateUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { name: true });

        res.status(200).json(updateUser);

    } catch (error) {

        console.log('Error in update profile', err);
        res.status(500).json({ message: 'Internal server error' });


    }
};