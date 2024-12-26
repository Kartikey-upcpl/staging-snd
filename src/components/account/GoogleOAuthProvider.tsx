import React, { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Define props explicitly
interface GoogleProviderProps {
    children: ReactNode;
}

// Create the wrapper component
const GoogleProvider: React.FC<GoogleProviderProps> = ({ children }) => {
    // Explicitly cast GoogleOAuthProvider to React.FC to fix JSX typing
    const OAuthProvider = GoogleOAuthProvider as unknown as React.FC<{
        clientId: string;
        children?: ReactNode;
    }>;

    return (
        <OAuthProvider clientId="913284221746-t9v85l1pq1q2p484c9nmv3751ojnjqqe.apps.googleusercontent.com">
            {children}
        </OAuthProvider>
    );
};

export default GoogleProvider;
