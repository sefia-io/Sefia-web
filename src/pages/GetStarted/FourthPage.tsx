import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useInitStore } from "@/store/initStore";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FourthPage = () => {
  const { adminInfo, domainInfo, prevPage } = useInitStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const navigate = useNavigate();

    try {
      const dto = {
        admin: adminInfo,
        ...domainInfo,
      };
      const res = await axios.post("/api/init-server", dto);

      if (res.status === 200) {
        alert("Submission successful!");
        navigate('/');

      } else {
        alert(`Submission failed: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">🚀 Confirm Your Information</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Please review the information below and make sure it is accurate before submission.
      </p>

      {/* Admin Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">👤 Admin Information</h3>
        <div className="space-y-2">
          <div>
            <Label>Email:</Label>
            <p>{adminInfo.email}</p>
          </div>
          <div>
            <Label>Name:</Label>
            <p>{adminInfo.name}</p>
          </div>
          <div>
            <Label>Password:</Label>
            <p>********</p> {/* 비밀번호는 마스킹 처리 */}
          </div>
        </div>
      </div>

      {/* Domain Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🌐 Domain Information</h3>
        <div className="space-y-2">
          <div>
            <Label>Application Domain:</Label>
            <p>{domainInfo.applicationDomain}</p>
          </div>
          <div>
            <Label>Serving Domain:</Label>
            <p>{domainInfo.servingDomain}</p>
          </div>
          <div>
            <Label>Web Root:</Label>
            <p>{domainInfo.webRoot}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevPage}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={loading}
        >
          Edit Information
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Final Submit"}
        </Button>
      </div>
    </Card>
  );
};

export default FourthPage;
