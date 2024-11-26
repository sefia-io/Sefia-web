import { useInitStore } from "@/store/initStore";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const SecondPage = () => {
  const { adminInfo, setAdminInfo, nextPage } = useInitStore();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    ...adminInfo,
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formValues.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formValues.name) {
      newErrors.name = "Name is required.";
    } else if (formValues.name.length > 20) {
      newErrors.name = "Name cannot exceed 20 characters.";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required.";
    } else if (
      formValues.password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formValues.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number.";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAdminInfo({
      email: formValues.email,
      name: formValues.name,
      password: formValues.password,
    });

    setTimeout(() => {
      setLoading(false);
      nextPage();
    }, 500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-md">
      {/* Title with emoji */}
      <h2 className="text-xl font-bold mb-4 text-center">🚀 Initial Admin Setup</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Set up your admin credentials to get started.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div>
          <Label htmlFor="email">📧 Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter admin email"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name">👤 Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter admin name"
          />
          <p className="text-sm text-gray-500 mt-1">Max 20 characters.</p>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">🔒 Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter admin password"
          />
          <p className="text-sm text-gray-500 mt-1">Least 8 characters long, include uppercase, lowercase, and a number.</p>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">🔒 Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter admin password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save & Continue"}
        </Button>
      </form>
    </Card>
  );
};

export default SecondPage;
