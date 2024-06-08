import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';

import Bookcom from './Bookcom';
import SignUpPage from './SignUpPage';
import Card from './components/Card';
import ProtectedRoute from './util/ProtectedRoute'; // Import the ProtectedRoutes component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Bookcom />} />
          <Route path="/book" element={<Card />} />
        </Route>
        
        <Route path="/sign-out" element={<SignedOut />} />
      </Routes>
    </Router>
  );
}

export default App;
