import React, { useState, useContext } from 'react';
import { server, AuthContext } from '../../context/UserContext'
import axios from "axios";
import toast from "react-hot-toast";


const DailyExpComp = ({ dailyExp, setDailyExp,  balance, setBalance }) => {
  const { isAuthenticated, setIsAuthenticated, userId, setUserId} = useContext(AuthContext);
  const [newExpense, setNewExpense] = useState({ name: '', cost: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExpense = async() => {
    const response = await axios.post(`${server}/addDailyExp`, {
        name : newExpense.name, cost : newExpense.cost, userId : userId,
      });
    
      toast.success('daily exp added');
    const newDailyExpense = response.data.newDailyExpense;

    setDailyExp((prev) => [...prev, newDailyExpense])
    setBalance(balance-newExpense.cost);
    setNewExpense({ name: '', cost: 0 });
  };

  return (
    <div>
      <h2>DailyExpComp</h2>
      {dailyExp && dailyExp.length > 0 && (
        <ul>
          {dailyExp.map((expense, index) => (
            <li key={index}>
              {expense.name} - ${expense.cost}
            </li>
          ))}
        </ul>
      )}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={newExpense.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Expense Cost"
          value={newExpense.cost}
          onChange={handleChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default DailyExpComp;
