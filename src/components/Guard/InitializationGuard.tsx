import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useServerStore } from "@/store/serverStore";

const InitializationGuard = ({ children }: { children: ReactNode }) => {
    const { isInitialized, checkInitialization } = useServerStore();
    const location = useLocation();

    useEffect(() => {
        checkInitialization();
    }, [checkInitialization]);

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
