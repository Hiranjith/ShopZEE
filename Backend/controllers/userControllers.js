import User from '../models/userModels.js'
import asyncHandler  from '../middlewares/asyncHandler.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/createToken.js'


const createUser = asyncHandler(async (req, res)=>{

    const {username, email, password} = req.body;

    if (!username || !password || !email) {
            res.status(400).send("Please provide all the required details")
    }
    
    const userExist = await User.findOne({email})
    if(userExist) {res.status(400).send("The user already exist")}

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({username, email, password : hashedPassword});

    try {
        await newUser.save();
        generateToken(res, newUser._id);

        res.status(200)
        .json({username : newUser.username,
            email : newUser.email,
            _id : newUser._id,
            isAdmin : newUser.isAdmin
        })

    } catch (error) {
        res.status(400)
        throw new Error("Invalid data");
        
    }
    
})


const loginUser = asyncHandler(async(req, res)=>{

    const {email, password} = req.body;

    const existingUser = await User.findOne({ email })
    let isPasswordValid;

    if (existingUser) {
        isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            generateToken(res, existingUser._id)
    
            res.status(200).json({username : existingUser.username,
                email : existingUser.email,
                _id : existingUser._id,
                isAdmin : existingUser.isAdmin
            })
    
            return
        }
    }    
})

const logoutCurrentUser = asyncHandler(async(req, res) => {

        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
    
        res.status(200).json({message : "You have successfully logged out"})


})

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json(user)
    } else {
        throw new Error("User not found");
        
    }
})

const updateCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()

        res.status(200).json({
            username : updatedUser.username,
            email : updatedUser.email,
            _id : updatedUser._id
        })
    } else {
        res.status(404)
        throw new Error("User not found");
        
    }

})

const deleteUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.deleteOne({_id: user._id})
        res.status(200).send("The selected user is successfully deleted")
    } else {
        res.status(404)
        throw new Error("User not found");
    }
    return;
})

const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404)
        throw new Error("User not found");
    }

    return;
})

const updateUserById = asyncHandler(async(req, res) => {
    const {username, email, isAdmin} = req.body
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        user.username = username || user.username;
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin)

        const updatedUser = await user.save();

        res.status(200).json({
            username : updatedUser.username,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin
        })
    } else {
        throw new Error("user not found");
        
    }
    return;
})

export {createUser, loginUser, logoutCurrentUser, getAllUsers
    ,getCurrentUserProfile, updateCurrentUserProfile, deleteUserById,
    getUserById, updateUserById
};