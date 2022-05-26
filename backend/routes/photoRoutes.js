import express from 'express';
import {getPhotos,getPhotoById,deletePhoto,updatePhoto,createPhoto} from '../controllers/photoControllers.js'
import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();



router.route('/').get(getPhotos).post(protect,admin,createPhoto)
router.route('/:id')
.get(getPhotoById)
.delete(protect,admin,deletePhoto)
.put(protect,admin,updatePhoto)





export default router;