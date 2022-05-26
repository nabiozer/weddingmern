
import asyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';

//  @desc Fetch all expenses
//  @route Get /api/expenses
//  @acces Public

const getExpenses = asyncHandler(async (req,res) => {
    const expenses = await Expense.find({})
    res.json(expenses)
})

//  @desc Fetch  expense
//  @route Get /api/expenses/:id
//  @acces Private
const getExpenseById = asyncHandler(async (req,res) => {
    const expense = await Expense.findById(req.params.id)
    if(expense) {
        res.json(expense)
    } else {
        res.status(404)
        throw new Error('Expense not found')
     
    }
})


//  @desc Delete expense
//  @route Dekete /api/expenses/:id
//  @acces Private/Admin
const deleteExpense = asyncHandler(async (req,res) => {
    const expense = await Expense.findById(req.params.id)
    if(expense) {
        await expense.remove()
        res.json({message:'expense deleted'})



    } else {
        res.status(404)
        throw new Error('Expense not found')
     
    }
})



//  @desc Create expense
//  @route Create /api/expenses/
//  @acces Private/Admin


const createExpense = asyncHandler(async (req,res) => {
    const {price,date,description} = req.body
    

  
    const expense = await Expense.create({price,date,description})
    if(expense) {
        res.status(201).json({
            _id : expense._id,
            price: expense.price,
            date: expense.date,
            description: expense.description,
          
        })
    } else {
        res.status(401)
        throw new Error('expense not found')
    }
   
  
})

//  @desc Update Expense
//  @route Put /api/expenses/:id
//  @acces Private/Admin
const updateExpense = asyncHandler(async (req,res) => {

    const {price,description,date} = req.body
    const expense = await Expense.findById(req.params.id)
    if(expense) {

        expense.price = price || expense.price
        expense.description = description || expense.description
        expense.date = date || expense.date
      
        

        const updatedExpense = await expense.save();
        res.json(updatedExpense)
    } else {
        res.status(404)
        throw new Error('Expense not found')
    }

   
})


export {
    getExpenses,getExpenseById,deleteExpense,createExpense,updateExpense
}