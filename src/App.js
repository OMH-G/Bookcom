import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';

import Bookcom from './Bookcom';
import SignUpPage from './SignUpPage';
import Card from './components/Card';
import ProtectedRoute from './util/ProtectedRoute'; // Import the ProtectedRoutes component
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-out" element={<SignedOut />} />
        
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Bookcom />} />
            <Route path="/book" element={<Card />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
