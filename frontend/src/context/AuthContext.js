import React, { createContext, useState } from 'react';

export const AuthCtx = createContext(null);

const AuthContext = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('voterId') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);

  const login = (token, user, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('voterId', user);
    localStorage.setItem('role', role);
    setAuthToken(token);
    setCurrentUser(user);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
    setCurrentUser(null);
    setUserRole(null);
  };

  return (
    <AuthCtx.Provider value={{ authToken, currentUser, userRole, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export default AuthContext;
