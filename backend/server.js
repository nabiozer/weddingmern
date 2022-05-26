import express from 'express'
import dotenv  from 'dotenv'
import path from 'path'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import photoRoutes from './routes/photoRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import awsUpload from './routes/awsUpload.js'
import expenseRoutes from './routes/expenseRoutes.js'

dotenv.config();


connectDB();
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('api running')
   
})


app.use('/api/photos',photoRoutes);
app.use('/api/users',userRoutes);
app.use('/api/expenses',expenseRoutes);
app.use('/api/upload',uploadRoutes);
app.use('/api/uploadfile',awsUpload)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/uploadsfile',express.static(path.join(__dirname, '/uploadsfile')))
app.use(notFound)
app.use(errorHandler)





const PORT = process.env.PORT || 5000


app.listen(5000,console.log(`server running ${process.env.NODE_ENV} on ${PORT}`))