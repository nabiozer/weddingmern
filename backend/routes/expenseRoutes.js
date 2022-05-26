import express from 'express';
import {getExpenses,getExpenseById,deleteExpense,updateExpense,createExpense} from '../controllers/expenseControllers.js'
import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();



router.route('/').get(protect,admin,getExpenses).post(protect,admin,createExpense)
router.route('/:id')
.get(protect,admin,getExpenseById)
.delete(protect,admin,deleteExpense)
.put(protect,admin,updateExpense)





export default router;