import { Link } from "react-router-dom";
import TestLoginButton from "./TestLoginButton";
import "./Home.css";

function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Event Manager</h1>
        <p>Create, manage, and discover amazing events</p>
        <div className="cta-buttons">
          {isLoggedIn ? (
            <Link to="/dashboard" className="cta-button primary">
              View Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="cta-button primary">
                Get Started
              </Link>
              <Link to="/login" className="cta-button secondary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <TestLoginButton />

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Create Events</h3>
            <p>
              Easily create and manage your events with our intuitive interface
            </p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Updates</h3>
            <p>Get instant updates on event changes and attendee status</p>
          </div>
          <div className="feature-card">
            <h3>Track Attendance</h3>
            <p>Monitor event attendance and manage participant lists</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
