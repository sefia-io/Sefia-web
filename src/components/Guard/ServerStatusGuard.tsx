import { ReactNode, useEffect } from "react";
import { useServerStore } from "@/store/serverStore";
import Loading from "@/components/Loading";

type ServerStatusGuardProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

const ServerStatusGuard = ({ children, fallback }: ServerStatusGuardProps) => {
  const { serverOn, isInitialized, checkInitialization } = useServerStore();

  useEffect(() => {
    checkInitialization();
  }, [checkInitialization]);

  if (serverOn === false) {
    return (
      fallback || (
        <div className="h-screen flex items-center justify-center">
          <p>Server is offline. Please try again later.</p>
        </div>
      )
    );
  }

  if (isInitialized === undefined) {
    return <Loading className="h-screen flex items-center justify-center" />;
  }

  return <>{children}</>;
};

export default ServerStatusGuard;
