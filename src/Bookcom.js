import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useClerk, useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';

const Bookcom = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState('');
  const {session}=useClerk();

  useEffect(() => {
    console.log('useEffect triggered');
    // The URL to your servlet
    const url = 'http://localhost:8080/Bookcom/image';
    const jwt_token=session.lastActiveToken.jwt.encoded.header+'.'+session.lastActiveToken.jwt.encoded.payload+'.'+session.lastActiveToken.jwt.encoded.signature

    // Fetch the image using Axios
    axios.get(url, { responseType: 'blob' ,headers:{Authorization:`Bearer ${jwt_token}`}})
      .then(response => {
        console.log('Image fetched');
        
        // Create a local URL of the blob
        const localUrl = URL.createObjectURL(response.data);
        setImageUrl(localUrl);
      })
      .catch(error => console.error('Error fetching image:', error));
  }, []); // Empty dependency array ensures this runs only once
  async function addUser(){
    // let session=await ();
    const token=session.lastActiveToken.jwt.encoded.payload
    const jwt_token=session.lastActiveToken.jwt.encoded.header+'.'+session.lastActiveToken.jwt.encoded.payload+'.'+session.lastActiveToken.jwt.encoded.signature
    const i_token=await session.getToken()
    console.log(i_token)
    let response=await axios.post('http://localhost:8080/Bookcom/user/register',{'userid':user.id},{headers:{Authorization:`Bearer ${i_token}`}})
}
addUser();
  return (
    <>
      
      <Content />
      <div>
        <h1>Welcome, {user ? user.firstName : 'User'}</h1>
        <p>This is your dashboard.</p>
        <h1>Image from Servlet</h1>
        {imageUrl ? <img src={imageUrl} alt="Fetched from servlet" /> : <p>Loading...</p>}
      </div>
    </>
  );
};

export default Bookcom;
