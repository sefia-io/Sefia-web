import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useServerStore } from "@/store/serverStore";
import Loading from "../Loading";

const InitializationGuard = ({ children }: { children: ReactNode }) => {
  const { isInitialized, checkInitialization } = useServerStore();
  const location = useLocation();

  useEffect(() => {
    checkInitialization();
  }, [checkInitialization]);

  if (isInitialized === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

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
