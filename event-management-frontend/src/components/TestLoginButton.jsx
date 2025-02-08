import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/axiosConfig";
import "./TestLoginButton.css";

function TestLoginButton() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [delayMessage, setDelayMessage] = useState(false);

  const handleTestLogin = async () => {
    setLoading(true);
    setDelayMessage(false);

    const delayTimer = setTimeout(() => {
      setDelayMessage(true);
    }, 5000);

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
      clearTimeout(delayTimer);
      setLoading(false);
      setDelayMessage(false);
    }
  };

  return (
    <div className="test-login-container">
      <p>Click on this &quot;Test Login&quot; to log in for evaluation.</p>

      <button
        className="test-login-button"
        onClick={handleTestLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Test Login"}
      </button>

      {delayMessage && (
        <p className="delay-message">
          Since the backend is deployed on a free server, it might take some
          time to wake up(around 90 sec).
          <br />
          Please wait...^_^
        </p>
      )}
    </div>
  );
}

export default TestLoginButton;
