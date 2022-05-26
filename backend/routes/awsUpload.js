import path from 'path'
import express from 'express'
import multer from 'multer'
import {s3Uploadv2} from '../utils/s3service.js'
const router = express.Router()


// const upload = multer({dest:"uploadsfile/"})

// router.post('/', upload.single('file'), (req, res) => {
//   res.send(`${req.file.path}`)
// })


// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,"uploadsfile")
//     },
//     filename(req, file, cb) {
//         cb(
//           null,
//           `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
//         )
//       },
// })

const storage = multer.memoryStorage()
const fileFilter = (req,file,cb) => {
    if(file.mimetype.split('/')[0] === 'image' || file.mimetype === 'application/zip' || file.mimetype === "video/mp4"){
        cb(null,true)
    } else {
        cb(new Error('file not correct type'),false)
        console.error(error)
    }
}
//limits: {fileSize:1000 -> 1kb}
const upload = multer({storage,fileFilter})

router.post('/', upload.array('file'), async(req, res) => {
    const file = req.files[0]
    const result = await s3Uploadv2(file);
    
    res.send(result.Location)
})

// const upload = multer({dest:"uploadsfile/"})

// const multiUpload = upload.fields([{name : 'users'}, {name : 'sozlesme'}])

// router.post('/', multiUpload, (req, res) => {
//    
//   res.send(`succes`)
// })

export default router