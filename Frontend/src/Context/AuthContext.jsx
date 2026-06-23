import { createContext, useContext, useState } from 'react'
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        try {
            setLoading(true)

            setUser({
                id: 1,
                username: "Demo User",
                email: credentials.email,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const register = async (userData) => {
        try {
            setLoading(true);
            setUser(userData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null);
    }

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
