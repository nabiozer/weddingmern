import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import User from '../models/UserModel.js';

//  @desc Auth user & get TOKEN
//  @route POST /api/users/login
//  @acces Public

const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email:email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            deliveryInfo : user.deliveryInfo,
            reservationInfo :user.reservationInfo,
            chosen : user.chosen,
            video : user.video,
            photos : user.photos,
            albumDelivered : user.albumDelivered,
            photoProcessed : user.photoProcessed,
            token:generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Inlavid email or password')
    }
})

//  @desc Get user profile 
//  @route GET /api/users/profile
//  @acces Private

const getUserProfile = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            deliveryInfo : user.deliveryInfo,
            reservationInfo :user.reservationInfo,
            chosen : user.chosen,
            video : user.video,
            photos : user.photos,
            albumDelivered : user.albumDelivered,
            photoProcessed : user.photoProcessed,
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
   
})

//  @desc   Register a new User
//  @route POST /api/users/login
//  @acces Public

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,deliveryInfo,reservationInfo,album} = req.body
    const userExist= await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({name,email,password,deliveryInfo,reservationInfo,album})
    if(user) {
        res.status(201).json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            deliveryInfo : user.deliveryInfo,
            reservationInfo :user.reservationInfo,
            chosen : user.chosen,
            video : user.video,
            photos : user.photos,
            albumDelivered : user.albumDelivered,
            photoProcessed : user.photoProcessed,
            album :user.album,
            token:generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
   
  
})

//  @desc Get user profile 
//  @route PUT /api/users/profile
//  @acces Private

const updateUserProfile = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        
        if(req.body.password) {
            user.password = req.body.password || user.password
        }

        user.deliveryInfo = req.body.deliveryInfo || user.deliveryInfo
        user.reservationInfo = req.body.reservationInfo || user.reservationInfo
        user.chosen = req.body.chosen || user.chosen
        user.video = req.body.video || user.video
        user.photos = req.body.photos || user.photos
        user.albumDelivered = req.body.albumDelivered || user.albumDelivered
        user.photoProcessed = req.body.photoProcessed || user.photoProcessed
        user.album = req.body.album || user.album
        user.isDone = req.body.isDone || user.isDone
       
        const updatedUser = await user.save();
        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            deliveryInfo : updatedUser.deliveryInfo,
            reservationInfo :updatedUser.reservationInfo,
            chosen : updatedUser.chosen,
            video : updatedUser.video,
            photos : updatedUser.photos,
            albumDelivered : updatedUser.albumDelivered,
            photoProcessed : updatedUser.photoProcessed,
            isDone : updatedUser.isDone,
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
   res.send('Succes')
})


//  @desc Get users
//  @route GET /api/users
//  @acces Private Admin

const getUsers = asyncHandler(async (req,res) => {

    const users = await User.find({})

    res.json(users)
    
})

//  @desc Delete user
//  @route GET /api/users:id
//  @acces Private Admin

const deleteUser = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({message:'user removed'})
    } else {
        res.status(404)
        throw new Error('user not found')
    }
    
    
})

//  @desc Get User by ID
//  @route GET /api/users:id
//  @acces Private Admin

const getUserById = asyncHandler(async (req,res) => {

    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('user not found')
    }
    
    
    
})
//  @desc Update User profile 
//  @route PUT /api/users/:id
//  @acces Private admin

const updateUser = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.params.id)

    if(user) {
        
        if(req.body.password) {
            user.password = req.body.password || user.password
        }
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.deliveryInfo = req.body.deliveryInfo || user.deliveryInfo
        user.reservationInfo = req.body.reservationInfo || user.reservationInfo
        user.chosen = req.body.chosen || user.chosen
        user.video = req.body.video || user.video
        user.photos = req.body.photos || user.photos
        user.albumDelivered = req.body.albumDelivered || user.albumDelivered
        user.photoProcessed = req.body.photoProcessed || user.photoProcessed
        user.album = req.body.album || user.album
       
        const updatedUser = await user.save();
        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            deliveryInfo : updatedUser.deliveryInfo,
            reservationInfo :updatedUser.reservationInfo,
            chosen : updatedUser.chosen,
            video : updatedUser.video,
            photos : updatedUser.photos,
            albumDelivered : updatedUser.albumDelivered,
            photoProcessed : updatedUser.photoProcessed,
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
   res.send('Succes')
})


export { authUser,getUserProfile ,registerUser,updateUserProfile,getUsers,deleteUser,updateUser,getUserById}








