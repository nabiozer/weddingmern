import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { listUsers } from "../../store/user-actions";
import {  useHistory } from "react-router-dom";

import AdminNav from "../components/AdminNav";
import './AdminPage.css'
import { listExpenses } from "../../store/expense-actions";



const AdminPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const userLogin = useSelector((state) => state.user.userLogin);
  const expenseList = useSelector((state) => state.expense.expenseList);
  const {  success } = userList;
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.user.userDelete);
  const { success: successDelete } = userDelete;
  const { success: expenseSuccess } = expenseList;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(listExpenses());
    } else {
      history.push("/login");
    }

  
    // eslint-disable-next-line
  }, [dispatch, success, successDelete, expenseSuccess,history]);

  
  return (
    <section className="admin-section">
      {" "}
      <div className="color"></div>
      <AdminNav />
      

 
      
      <div className="admin-first">
       
        <div>
          <div>
            <h3>Çekim Sayısı</h3>
            <p>{userList.users.length -1}</p>
          </div>
          <div>
            <h3>Kalan</h3>
            <p>
              {userList.users.filter((user) => user.isDone === false).length - 1 }
            </p>
          </div>
        </div>
        </div>
        <div className="admin-second">
          <div className="admin-second__f">
            <div>
              <h3>Gelir </h3>
              {userList.users
                .map((user) => user.reservationInfo.advancePayment)
                .reduce(function (a, b) {
                  return a + b;
                }, 0)}{" "}
              TL
            </div>
            <div>
              <h3> Gider </h3>
              {expenseList.expenses
                .map((expense) => expense.price)
                .reduce(function (a, b) {
                  return a + b;
                }, 0)}{" "}
              TL
            </div>
          </div>
          
          <div className="admin-second__s"> Kasa -
            {Number(
              userList.users
                .map((user) => user.reservationInfo.advancePayment)
                .reduce(function (a, b) {
                  return a + b;
                }, 0)
            ) -
              Number(
                expenseList.expenses
                  .map((expense) => expense.price)
                  .reduce(function (a, b) {
                    return a + b;
                  }, 0)
              )} TL
          </div>
        </div>
        
        
        
    </section>
  );
};

export default AdminPage;
