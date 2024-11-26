import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInitStore } from "@/store/initStore";
import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
  applicationDomain: string;
  servingDomain: string;
  webRoot: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const ThirdPage = () => {
  const { domainInfo, setDomainInfo, nextPage } = useInitStore();
  const [formValues, setFormValues] = useState<FormValues>({
    applicationDomain:
      domainInfo?.applicationDomain ||
      `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`,
    servingDomain:
      domainInfo?.servingDomain ||
      `${window.location.protocol}//cdn.${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`,
    webRoot: domainInfo?.webRoot || "/var/www/sefia",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [ignoreFormatCheck, setIgnoreFormatCheck] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    const domainRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(:\d+)?$/;

    if (formValues.applicationDomain.trim() === formValues.servingDomain.trim()) {
      newErrors.servingDomain = "Serving domain must be different from the Application Domain.";
    }

    if (!ignoreFormatCheck) {
      const validateDomain = (key: keyof FormValues, value: string, label: string) => {
        if (!value) {
          newErrors[key] = `${label} is required.`;
        } else if (!domainRegex.test(value)) {
          newErrors[key] = `Invalid ${label.toLowerCase()} format.`;
        } else if (value.endsWith("/")) {
          newErrors[key] = `${label} should not end with a '/'.`;
        }
      };

      validateDomain("applicationDomain", formValues.applicationDomain, "Application domain");
      validateDomain("servingDomain", formValues.servingDomain, "Serving domain");
    }

    if (!formValues.webRoot.trim()) {
      newErrors.webRoot = "Web root path is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setDomainInfo({
      applicationDomain: formValues.applicationDomain.trim(),
      servingDomain: formValues.servingDomain.trim(),
      webRoot: formValues.webRoot.trim(),
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
    <Card className="w-full max-w-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">🚀 Domain Setup</h2>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Application Domain */}
        <div>
          <Label htmlFor="applicationDomain">🌐 Application Domain</Label>
          <Input
            id="applicationDomain"
            name="applicationDomain"
            type="text"
            value={formValues.applicationDomain}
            onChange={handleChange}
            placeholder="Enter application domain (e.g., https://example.com:3000)"
          />
          {errors.applicationDomain && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.applicationDomain}</p>
          )}
        </div>

        {/* Serving Domain */}
        <div>
          <Label htmlFor="servingDomain">📤 Serving Domain</Label>
          <Input
            id="servingDomain"
            name="servingDomain"
            type="text"
            value={formValues.servingDomain}
            onChange={handleChange}
            placeholder="Enter serving domain (e.g., https://cdn.example.com:8080)"
          />
          {errors.servingDomain && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.servingDomain}</p>
          )}
        </div>

        {/* Web Root */}
        <div>
          <Label htmlFor="webRoot">📁 Web Root</Label>
          <Input
            id="webRoot"
            name="webRoot"
            type="text"
            value={formValues.webRoot}
            onChange={handleChange}
            placeholder="Enter web root directory path (e.g., /var/www/html)"
          />
          {errors.webRoot && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.webRoot}</p>
          )}
        </div>

        {/* Ignore Format Check */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ignoreFormatCheck"
            checked={ignoreFormatCheck}
            onCheckedChange={() => setIgnoreFormatCheck(!ignoreFormatCheck)}
          />
          <Label htmlFor="ignoreFormatCheck" className="cursor-pointer text-sm text-gray-600">
            Ignore domain format validation<br />
            (Use only in special cases, such as when using a direct IP address)
          </Label>
        </div>

        {/* Alert */}
        <Alert variant="destructive" className="mt-4">
          <AlertDescription className="text-sm text-red-500">
            Please note that the values set on this page are difficult to change later.
            Make sure the values are accurate and double-check for any typos.<br />
            Including the HTTP/HTTPS schema and the port (if applicable) is recommended.<br />
            Do not include a trailing '/' at the end of the domain.
          </AlertDescription>
        </Alert>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={loading || Object.values(formValues).some((val) => !val.trim())}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </Button>
      </form>
    </Card>
  );
};

export default ThirdPage;
