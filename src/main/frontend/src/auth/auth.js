import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authenticate } from "../api/auth-api";

const defaultAuth = {
    profile: null,
    accessToken: null,
    refreshToken: null
}

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(defaultAuth);

    useEffect(() => {
        console.log(auth);
    }, [auth]);

    const signIn = async (credentials, callback) => {
        const response = await authenticate(credentials);
        if (response.status === 200) {
            const data = response.data;
            setAuth({
                ...defaultAuth,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            callback();
        } else {
            //handle error
        }
    }

    const signOut = (callback) => {
        setAuth(defaultAuth);
        callback();
    }

    const setProfile = (profile) => {
        setAuth({
            ...auth,
            profile
        });
    }

    const contextValue = { auth, signIn, signOut, setProfile };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if(!auth.accessToken) {
        return <Navigate to="/sign-in" state={{ from: location}} replace />
    }

    return children;
}
