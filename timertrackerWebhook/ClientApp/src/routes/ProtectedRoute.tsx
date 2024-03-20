import { Navigate, useLocation, useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode};

const ProtectedRoute = ({children}: Props) => {
    const location = useLocation();
    // TODO: create custom hook for authentication?
    // const { isLoggedIn } = useAuth();
    let isLoggedIn = true
    return isLoggedIn ? (
        <>{children}</>
    ) : (
        // TODO: what does state from: location replace do?
        <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
}

export default ProtectedRoute;