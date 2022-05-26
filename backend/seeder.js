import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './data/users.js'
import photos from './data/photos.js'
import User from './models/UserModel.js'
import Photo from './models/PhotoModel.js';

import connectDB from './config/db.js';

dotenv.config()
connectDB();


const importData = async () => {
    try {
        await Photo.deleteMany();
        await User.deleteMany();

        await User.insertMany(users)

        await Photo.insertMany(photos);
        console.log('data imported')
        process.exit(0);
    } catch (error) {
        console.error(error)
        process.exit(1);
        
    }

}

const destroyData = async () => {
    try {
        await Photo.deleteMany();
        await User.deleteMany();

        console.log('data destroyed')
        process.exit(0);
    } catch (error) {
        console.error(error)
        process.exit(1);
        
    }

}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}