import mongoose from 'mongoose';


const expenseSchema = mongoose.Schema({
   
   
    price : {
        type:Number,
    },
    description : {
        type:String,
    },
    date : {
        type:String,
    },
  

}, {
    timestamps:true
})


const Expense = mongoose.model('Expense',expenseSchema);



export default Expense