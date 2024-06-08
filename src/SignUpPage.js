import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp, SignedOut } from '@clerk/clerk-react';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpComplete = () => {
    navigate('/dashboard');
  };

  return (
    <SignedOut>
      <SignUp  signInUrl={"/dashboard"} />
    </SignedOut>
  );
}

export default SignUpPage;
