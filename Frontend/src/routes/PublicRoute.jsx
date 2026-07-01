import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Loader } from "lucide-react";

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}

export default PublicRoute;