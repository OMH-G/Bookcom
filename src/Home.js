// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the App</h1>
    <p>Please <Link to="/sign-up">sign up</Link> to access your dashboard.</p>
  </div>
);

export default Home;
