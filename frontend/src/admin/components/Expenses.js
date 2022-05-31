import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listExpenses, deleteExpense ,newExpense} from "../../store/expense-actions";
import { expenseActions } from "../../store/expense-slice";

import "./UserList.css";
import "./Expenses.css"
import { Link } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import { listUsers } from "../../store/user-actions";
import AdminNav from "./AdminNav";

const Expenses = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  
  const expenseList = useSelector((state) => state.expense.expenseList);
  const expenseCreate = useSelector((state) => state.expense.expenseCreate);
  const expenseDelete = useSelector((state) => state.expense.expenseDelete);
  const {success:expenseDeleteSuccess} = expenseDelete;
  const {success:expenseSucces } = expenseCreate;

  const { error, loading, expenses } = expenseList;
  useEffect(() => {
    dispatch(listUsers());
    dispatch(listExpenses());
    dispatch(expenseActions.expenseCreateReset())
  }, [dispatch,expenseSucces,expenseDeleteSuccess]);

  const deleteHandler = (id) => {
    dispatch(deleteExpense(id));
  };

  const createExpenseHandler = (e) => {
    e.preventDefault();
    dispatch(newExpense(description,date,price))
  }
  return (
    <>
      <div className="color"></div>
      <AdminNav />
      <section className="expenses-section">
        <h3>Masraf Ekle</h3>
        <form onSubmit={createExpenseHandler} className="expenses-form">
          <div className="expense-form__group">
            <label htmlFor="desc">Açıklama</label>
            <input
              type="text"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="expense-form__group">
            <label htmlFor="date">Tarih</label>
            <input
              type="text"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="expense-form__group">
            <label htmlFor="price">Fiyat</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
          <button type="submit">Masraf Ekle</button>
          </div>
        </form>
        {loading ? <Loader /> : 
        <div className="table-container">
          <table className="fl-table">
            <thead>
              <tr>
                <th>DESCRIPTION</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!error &&
                expenses.map((expense, index) => {
                  return (
                    <tr key={expense._id}>
                      <td>{expense.description}</td>
                      <td>{expense.date}</td>
                      <td>{expense.price}</td>

                      <td>
                        <Link to={`/admin/expense/${expense._id}/edit`}>
                          <button>
                            <i
                              className="fas fa-edit"
                              style={{ color: "green" }}
                            ></i>
                          </button>
                        </Link>
                        <button onClick={() => deleteHandler(expense._id)}>
                          <i
                            className="fas fa-trash"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>   
                <td>TOPLAM</td><td>{" "} 
              {expenses
                .map((expense) => expense.price)
                .reduce(function (a, b) {
                  return a + b;
                }, 0)} - TL
                </td>
                
                </tr>
            </tbody>
          </table>
          <div>
            <p>
           
            </p>
          </div>
        </div>
      }
      </section>
    </>
  );
};

export default Expenses;
