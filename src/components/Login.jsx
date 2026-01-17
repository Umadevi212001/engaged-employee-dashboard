import "../styles/Login.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="app-title">EMS</h1>
        <p className="app-subtitle">Employee Management System</p>

        <div className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <button onClick={handleLogin}>Sign In</button>
        </div>

        <p className="login-footer">
          Secure internal access only
        </p>
      </div>
    </div>
  );
};

export default Login;
