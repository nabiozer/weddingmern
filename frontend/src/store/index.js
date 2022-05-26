import { configureStore } from '@reduxjs/toolkit';
import choiceSlice from './choice-slice';

import photoSlice from './photo-slice';
import userSlice from './user-slice'
import expenseSlice from './expense-slice'


const store = configureStore({
  reducer: { photo: photoSlice.reducer , user: userSlice.reducer , choices : choiceSlice.reducer , expense: expenseSlice.reducer},
});

export default store;