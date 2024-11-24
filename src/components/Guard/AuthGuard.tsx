import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ReactNode } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
