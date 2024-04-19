import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext";
import FixedBillComp from "../components/billComponents/FixedBillComp";
import DailyExpComp from "../components/billComponents/DailyExpComp";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userId, setUserId} = useContext(AuthContext);
  const [dailyExp, setDailyExp] = useState([])
  const [fixedexp,setFixedExp]= useState([])
  const [balance, setBalance] = useState()

  const fetchUserDetail = async() => {
    if(!isAuthenticated)  {
      navigate('/login');
      return;
    }
    try {
      const response =  await axios.get( `${server}/getUserDetails/${userId}` );
      setDailyExp(response.data.user.dailyExps);
      setBalance(response.data.user.balance)
      setFixedExp(response.data.user.fixedBills);
      console.log(response.data.user)
      toast.success('user data fetched')
    } catch (error) {
      toast.error('something went wrong while user data fetching')
    }
  }

  // const addNewFixedBill = async(name, val) => {
  //   try {
  //     const response = await axios.post(
  //       `${server}/addNewFixedBill`,
  //       { userId : userId, name : name, val : val },
  //       { withCredentials: true }
  //     )
  //     console.log(response);
  //     toast.success('new bill added')
  //   } catch (error) {
  //     toast.error('new bill not added')
  //   }
  // }

  // const payAllBill = async() => {
    
  // }

  useEffect(() => {
    fetchUserDetail();
  }, [navigate]);

  return (
    <div>
      <h2> DashBoard </h2>
      { isAuthenticated && <p> isAuthenticated :  true </p>}
      { !isAuthenticated && <p> isAuthenticated :  false </p>}
      <p> userId : {userId} </p>
      <h2> Balance : {balance}</h2>
      <FixedBillComp fixedexp={fixedexp} />
      <DailyExpComp dailyExp={dailyExp} setDailyExp={setDailyExp}  balance={balance} setBalance={setBalance}/>
    </div>
    
  )
}

export default Dashboard