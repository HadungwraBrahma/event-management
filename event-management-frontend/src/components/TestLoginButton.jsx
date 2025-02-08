import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/axiosConfig";
import "./TestLoginButton.css";

function TestLoginButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTestLogin = async () => {
    setLoading(true);
    try {
      const response = await API.post("/api/auth/login", {
        email: "test@gmail.com",
        password: "123456",
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Test login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-login-container">
      <p>
        Click on this &quot;Test Login&quot; to Login for the evaluation
      </p>
      <button
        className="test-login-button"
        onClick={handleTestLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Test Login"}
      </button>
    </div>
  );
}

export default TestLoginButton;
