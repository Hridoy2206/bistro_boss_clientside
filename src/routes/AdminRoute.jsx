import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimation.json"

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, adminLoading] = useAdmin();

    if (loading || adminLoading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />
};

export default AdminRoute;