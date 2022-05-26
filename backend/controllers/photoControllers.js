
import asyncHandler from 'express-async-handler';
import Photo from '../models/PhotoModel.js';

//  @desc Fetch all photos
//  @route Get /api/photos
//  @acces Public

const getPhotos = asyncHandler(async (req,res) => {
    const photos = await Photo.find({})
    res.json(photos)
})

//  @desc Fetch  photo
//  @route Get /api/photos/:id
//  @acces Public
const getPhotoById = asyncHandler(async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    if(photo) {
        res.json(photo)
    } else {
        res.status(404)
        throw new Error('Photo not found')
     
    }
})


//  @desc Delete Photo
//  @route Dekete /api/photos/:id
//  @acces Private/Admin
const deletePhoto = asyncHandler(async (req,res) => {
    const photo = await Photo.findById(req.params.id)
    if(photo) {
        await photo.remove()
        res.json({message:'photo deleted'})



    } else {
        res.status(404)
        throw new Error('Photo not found')
     
    }
})


//  @desc Create Photo
//  @route Create /api/photos/
//  @acces Private/Admin
const createPhoto = asyncHandler(async (req,res) => {
    const photo = new Photo({
        image:req.body.image,
        description:req.body.description,
        property:req.body.property,

    })
   const createdPhoto = await photo.save();
   res.status(201).json(createdPhoto)
})

//  @desc Update Photo
//  @route Put /api/photos/:id
//  @acces Private/Admin
const updatePhoto = asyncHandler(async (req,res) => {

    const {description,image,property,_id,ul,packageName,packagePrice} = req.body
    const photo = await Photo.findById(req.params.id)
    if(photo) {

        photo.image = image || photo.image
        photo.description = description || photo.description
        photo.property = property || photo.property
        photo.ul = ul || photo.ul
        photo.packageName = packageName || photo.packageName
        photo.packagePrice = packagePrice || photo.packagePrice
        

        const updatedPhoto = await photo.save();
        res.json(updatedPhoto)
    } else {
        res.status(404)
        throw new Error('Photo not found')
    }

   
})


export {
    getPhotos,getPhotoById,deletePhoto,createPhoto,updatePhoto
}