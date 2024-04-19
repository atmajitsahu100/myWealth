import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext";
import FixedBillComp from "../components/billComponents/FixedBillComp";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userId, setUserId} = useContext(AuthContext);

  const fetchUserDetail = async() => {
    if(!isAuthenticated)  {
      navigate('/login');
      return;
    }
    try {
      const response =  await axios.post(
        `${server}/getUserDetail`,
        { userId : userId },
        { withCredentials: true }
      );
      console.log(response);
      toast.success('user data fetched')
    } catch (error) {
      toast.error('something went wrong while user data fetching')
    }
  }

  const addNewFixedBill = async(name, val) => {
    try {
      const response = await axios.post(
        `${server}/getUserDetail`,
        { userId : userId, name : name, val : val },
        { withCredentials: true }
      )
      console.log(response);
      toast.success('new bill added')
    } catch (error) {
      toast.error('new bill not added')
    }
  }

  const payAllBill = async() => {
    
  }

  useEffect(() => {
    fetchUserDetail();
  }, [navigate]);

  return (
    <div>
      <h2> DashBoard </h2>
      { isAuthenticated && <p> isAuthenticated :  true </p>}
      { !isAuthenticated && <p> isAuthenticated :  false </p>}
      <p> userId : {userId} </p>
      <h2> Balance : {} </h2>
      <FixedBillComp />
    </div>
    
  )
}

export default Dashboard