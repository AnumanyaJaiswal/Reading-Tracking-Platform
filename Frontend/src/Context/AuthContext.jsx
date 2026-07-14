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
    const [authLoading, setAuthLoading] = useState(true); // only for initial hydration
    const navigate = useNavigate();

    const login = async (credentials) => {
        // no setLoading(true) here — this is a local, per-form concern now
        const data = await loginUser(credentials);
        setUser(data.user);
        return data;
        // let errors propagate — no try/catch needed here unless you want side effects
    }

    const register = async (userData) => {
        const data = await signupUser(userData);
        setUser(data.user);
        return data;
    }

    const logout = async () => {
        await logoutUser();
        setUser(null);
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        };
        checkAuth();
    }, []);

    const value = {
        user,
        loading: authLoading, // PublicRoute/PrivateRoute only ever see this
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
