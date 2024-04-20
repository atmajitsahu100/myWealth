import React, { useState, useContext } from 'react';
import { server, AuthContext } from '../../context/UserContext';
import axios from "axios";
import toast from "react-hot-toast";

const FixedBillComp = () => {
  const { isAuthenticated, setIsAuthenticated, userId} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [duedate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // const response = await axios.post(`${server}/addDailyExp`, {
      //   name : newExpense.name, cost : newExpense.cost, userId : userId,
      // });

      const response=await axios.post(`${server}/addfixedbill`, { userId:userId, name:name, cost: cost });
      
      
    } catch (error) {
      console.error('Error adding fixed bill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
      <input type="date" placeholder="Due Date" value={duedate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit">Add Fixed Bill</button>
    </form>
  );
};

export default FixedBillComp;
