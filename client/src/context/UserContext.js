import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [userId, setUserId] = useState(null);

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
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId, server }}>
      {children}
    </AuthContext.Provider>
  );
};

const server =  "http://localhost:4000/api/v1";
export { AuthContext, AuthProvider, server };