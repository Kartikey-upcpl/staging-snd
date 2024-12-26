import React from 'react';
import { GoogleLogin, GoogleLoginProps } from '@react-oauth/google';

// Create a wrapper component that forces compatibility with React 18+
const GoogleLoginWrapper: React.FC<GoogleLoginProps> = (props) => {
    const GoogleButton = GoogleLogin as unknown as React.FC<GoogleLoginProps>;
    return <GoogleButton {...props} />;
};

export default GoogleLoginWrapper;
