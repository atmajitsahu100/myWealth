import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [userId, setUserId] = useState(() => {
    const token = Cookies.get("tokenf");
    if(token) {
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      return id;
    }
    return null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = Cookies.get("tokenf");
    return !!token;
  });

  useEffect(() => {
    const token = Cookies.get("tokenf");
    if(token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      setUserId(id);
    }
    else  {
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, [userId]); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

const server =  "http://localhost:4000/api/v1";
export { AuthContext, AuthProvider, server };
