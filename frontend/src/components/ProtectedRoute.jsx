import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute - Ensures only authenticated users with the right role can access routes.
 * @param {string} requiredRole - 'seller' or 'buyer' (optional, if omitted any logged-in user can access)
 * @param {ReactNode} children - The component to render if authorized
 */
const ProtectedRoute = ({ requiredRole, children }) => {
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    // Not logged in → redirect to login
    if (!token || !userRole) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role → redirect to correct dashboard
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to={userRole === 'seller' ? '/dashboard' : '/my-orders'} replace />;
    }

    return children;
};

export default ProtectedRoute;
