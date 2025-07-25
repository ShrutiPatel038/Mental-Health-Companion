import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const {email,password,fullName} = req.body;

    try{

        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({ message: "Password must be atleast 6 characters"});
        }

        const emailReqex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //simple email regex
        if(!emailReqex.test(email)){
            return res.status(400).json({ message: "Invalid email format"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "Email already exists, please use a different email"});
        }

        const softColors = ['fcd34d', 'fca5a5', '6ee7b7', 'a5b4fc', 'f9a8d4', 'bfdbfe'];

        const getRandomColor = () => {
            const idx = Math.floor(Math.random() * softColors.length);
            return softColors[idx];
        };

        const bgColor = getRandomColor();
    
        const randomAvatar = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=Brian&backgroundColor=${bgColor}`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic : randomAvatar,
        });

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d' //token will expire in 30 days
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
            httpOnly: true, //cookie is not accessible from client side  (prevents XSS attacks)
            sameSite: 'strict', //cookie is sent only to same site (prevents CSRF attacks)
            secure: process.env.NODE_ENV === 'production',
            path: '/' //cookie is sent only over HTTPS in production
        })

        res.status(201).json({success: true, user: newUser})
    } catch (error){
        console.log('Error in signup controller',error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function login(req, res) {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const isPasswordCorrect = await user.matchPassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d' //token will expire in 30 days
        });

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
            httpOnly: true, //cookie is not accessible from client side  (prevents XSS attacks)
            sameSite: 'strict', //cookie is sent only to same site (prevents CSRF attacks)
            secure: process.env.NODE_ENV === 'production' ,//cookie is sent only over HTTPS in production
            path: '/' //cookie is accessible from all routes
        })

        res.status(200).json({success: true, user});
    } catch(error){
        console.log('Error in signup controller',error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function logout(req, res) {
    // res.clearCookie('jwt')
    // res.status(200).json({ success: true, message: "Logout successful" });
    res.clearCookie('jwt', {
  httpOnly: true,
  sameSite: 'strict', // or 'none' if using cross-site cookies
  secure: process.env.NODE_ENV === 'production', // match 
  path: '/' // ensure the cookie is cleared for all routes
  // the secure flag
});
res.status(200).json({ message: 'Logged out' });
}

export async function getProfile(req, res) {
  try {
    // req.user should be set by your auth middleware
    const user = await User.findById(req.user.userId).select("fullName email profilePic")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json({ username: user.fullName, email: user.email, profilePic: user.profilePic })
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}