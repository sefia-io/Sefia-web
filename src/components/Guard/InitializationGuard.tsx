import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

const InitializationGuard = ({ children }: { children: ReactNode }) => {
    const isInitialized = true; // TODO: 서버에서 가져오거나 상태로 관리
    const location = useLocation();

    if (!isInitialized) {
        return location.pathname === "/get-started" ? (
            <>{children}</>
        ) : (
            <Navigate to="/get-started" />
        );
    }

    if (isInitialized && location.pathname === "/get-started") {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default InitializationGuard;
