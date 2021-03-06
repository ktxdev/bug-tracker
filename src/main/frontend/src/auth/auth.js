import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authenticate, authenticateDemoAdmin, authenticateDemoUser } from "../api/auth-api";

const defaultAuth = {
    profile: null,
    accessToken: null,
    refreshToken: null
}

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(defaultAuth);

    const signIn = async (credentials, callback) => {
        const response = await authenticate(credentials);
        const data = response.data;
        if (response.success) {
            setAuth({
                ...defaultAuth,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            callback(response.success)
        } else {
            callback(response.success, response.data.message)
        }
    }

    const demoAdminSignIn = async (callback) => {
        const response = await authenticateDemoAdmin();
        const data = response.data;
        if (response.success) {
            setAuth({
                ...defaultAuth,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            callback(response.success)
        } else {
            callback(response.success, response.data.message)
        }
    }

    const demoUserSignIn = async (callback) => {
        const response = await authenticateDemoUser();
        const data = response.data;
        if (response.success) {
            setAuth({
                ...defaultAuth,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            callback(response.success)
        } else {
            callback(response.success, response.data.message)
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

    const contextValue = { auth, demoAdminSignIn, demoUserSignIn, signIn, signOut, setProfile };

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
