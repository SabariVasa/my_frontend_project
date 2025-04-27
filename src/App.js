import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './chatbot/Regiester';
import Login from './auth/Login';
import DataAnalysis from './analysis/DataAnalysis';
import LLMChatBot from './chatbot/LLMChatBot';
import Chatbot from './chatbot/ChatBot';
import Protected from './Protected';
import ThreeLoader from './ThreeBackground/ThreeLoader';
import PrivateRoute from './PrivateRoute'; // <-- Import it
import Projects from './project/Projects';
// import ProjectDetail from './project/ProjectDetail';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {/* {loading && <ThreeLoader />} */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/analysis" element={
          <PrivateRoute>
            <DataAnalysis />
          </PrivateRoute>
        } />
        
        <Route path="/llm" element={
          <PrivateRoute>
            <LLMChatBot />
          </PrivateRoute>
        } />

        <Route path="/chatbot" element={
          <PrivateRoute>
            <Chatbot />
          </PrivateRoute>
        } />

        <Route path="/protected" element={
          <PrivateRoute>
            <Protected />
          </PrivateRoute>
        } />
        <Route path="/projects" element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        } />
        {/* <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} /> */}
        
      </Routes>
    </>
  );
}

export default App;
