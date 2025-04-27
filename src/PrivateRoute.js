// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return value;
    }
  }
  return null;
};

const PrivateRoute = ({ children }) => {
  const token = getTokenFromCookies();

  if (!token) {
    // No token = redirect to login
    return <Navigate to="/" replace />;
  }

  // Token exists = allow access
  return children;
};

export default PrivateRoute;
