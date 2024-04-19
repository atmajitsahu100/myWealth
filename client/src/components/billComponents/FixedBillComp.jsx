import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { server, AuthContext } from "../../context/UserContext";

function FixedBillPay({fixedexp}) {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [duedate,setDueDate]=useState('');
    const [fixedBills, setFixedBills] = useState([]);
    const {userId}=useContext(AuthContext);
    useEffect(() => {
        fetchFixedBills();
    }, []);

    const fetchFixedBills = async () => {
        try {
  
           const response = await axios.get(`${server}/getfixedbill/:userId`);
            setFixedBills(response.data);
        } catch (error) {
            console.error('Error fetching fixed bills:', error);
        }
    };

    const handleAddFixedBill = async () => {
        try {
        //console.log(userId,name,cost,duedate);
            await axios.post(`${server}/addfixedbill`, { userId: userId,name: name, cost: cost,duedate:duedate});
            //fetchFixedBills();
        } catch (error) {
            console.error('Error adding fixed bill:', error);
        }
    };

    const handlePayAllButtonClick = async () => {
        try {
            await axios.post(`${server}/payfixedbill`,{userId});
            fetchFixedBills();
        } catch (error) {
            console.error('Error paying all fixed bills:', error);
        }
    };

    return (
        <div>
            <h2>Fixed Bill Payments</h2>
            <div>
                <label htmlFor="payType">Pay Type:</label>
                <input
                    type="text"
                    id="payType"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="cost">Cost:</label>
                <input
                    type="number"
                    id="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="duedate">DueDate:</label>
                <input
                    type="date"
                    id="duedate"
                    value={duedate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button onClick={handleAddFixedBill}>Add Fixed Bill</button>
            <button onClick={handlePayAllButtonClick}>Pay All Fixed Bills</button>
            <h3>Fixed Bills</h3>
            <ul>
                {fixedexp.map((bill) => (
                    <li key={bill._id}>
                        {bill.name} - Cost: {bill.cost}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FixedBillPay;
