import { getAccessToken } from "@/shared/lib";
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
    mode?: 'onlyAuthenticated' | 'onlyGuests';
}

export const ProtectedRoute = ({children, mode = 'onlyAuthenticated',}: ProtectedRouteProps) => {
    const token = getAccessToken();
    const isAuthenticated = !!token;

    if (mode === 'onlyAuthenticated' && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (mode === 'onlyGuests' && isAuthenticated) {
    return <Navigate to="/profile" replace />;
}

  return children;
}



