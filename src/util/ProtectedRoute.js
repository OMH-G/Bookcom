import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser,useClerk } from '@clerk/clerk-react';
import axios from 'axios';
const ProtectedRoute = () => {
  const { isLoaded, isSignedIn,user } = useUser();
    const {session}=useClerk();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if(isSignedIn){
    async function addUser(){
        // let session=await ();
        const token=session.lastActiveToken.jwt.encoded.payload
        const jwt_token=session.lastActiveToken.jwt.encoded.header+'.'+session.lastActiveToken.jwt.encoded.payload+'.'+session.lastActiveToken.jwt.encoded.signature
        console.log(jwt_token)
        // let response=await axios.post('http://localhost:8080/Bookcom/user/register',{'userid':user.id},{headers:{Authorization:`Bearer ${jwt_token}`}})
    }
    addUser();
  }
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-up" />;
};

export default ProtectedRoute;
