import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const LoginPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login to Your Account</h2>
        </div>

        {/* Body */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full"
            />
          </div>
          <Button
            variant="default"
            className="w-full"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline">
            Sign up
          </a>.
        </div>

        {/* Dark Mode Toggle */}
        <div className="text-center mt-6">
          <Button variant="outline" onClick={toggleTheme}>
            Toggle to {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
