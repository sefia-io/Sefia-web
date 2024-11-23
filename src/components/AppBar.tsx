import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b-2">
      {/* Left Section: Logo and Navigation */}
      <div className="flex items-center space-x-4">
        <div className="text-lg font-bold">Sefia</div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-sm font-medium hover:underline">
            Docs
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Components
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Themes
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Colors
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            GitHub
          </a>
        </nav>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex flex-1 mx-4 max-w-lg">
        <Input
          type="search"
          placeholder="Search documentation..."
          className="w-full"
        />
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/sefia-io/Sefia"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[hsl(var(--primary))]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.247c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.084-.73.084-.73 1.205.084 1.838 1.234 1.838 1.234 1.07 1.835 2.809 1.304 3.495.998.108-.774.42-1.305.762-1.604-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.007-.323 3.3 1.23.96-.267 1.985-.4 3.006-.405 1.02.005 2.047.138 3.006.405 2.292-1.553 3.297-1.23 3.297-1.23.653 1.652.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.922.432.372.815 1.105.815 2.23v3.302c0 .32.192.694.8.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        <ModeToggle />

        {isAuthenticated ? (
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        ) : (
          <Button onClick={handleLogin} variant="default">
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppBar;
