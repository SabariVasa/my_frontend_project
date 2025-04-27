import React, { useEffect, useState } from 'react';
import { getProtectedData } from './api';

function Protected() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      getProtectedData(token)
        .then((response) => setMessage(response.data.message))
        .catch(() => setMessage('Access Denied'));
    } else {
      setMessage('No token found. Please log in.');
    }
  }, []);

  return <h1>{message}</h1>;
}

export default Protected;
