import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signupUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            setLoading(true);
            const data = await loginUser(credentials);

            setUser(data.user);

            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const register = async (userData) => {
        try {
            setLoading(true);
            const data = await signupUser(userData);
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    useEffect(() => {
    const checkAuth = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    checkAuth();
}, []);

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
