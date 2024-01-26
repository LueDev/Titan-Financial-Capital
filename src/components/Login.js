import "../index.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import logo from "../images/TC_no_background.png";

function Login() {
  // Access the login function passed as context
  const login = useOutletContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showValidation, setShowValidation] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Create a function that calls the login function when the form is submitted
  function handleLogin(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/authentication`)
      .then((res) => res.json())
      .then((data) => {
        let AccountFound = data.filter(
          (user) =>
            user.username === formData.username &&
            user.password === formData.password
        );
        
        try {
          AccountFound[0]["id"] !== null
            ? login.login()
            : console.warn("Invalid credentials");
        } catch (error) {
          console.warn("Invalid credentials");
          setShowValidation(true);
          setTimeout(() => {
            setShowValidation(false);
          }, 2000);
        }
      });
  }

  return (
    <div className="Login">
      <div className="Login_logo">
        <img src={logo} alt="Titan Financial" />
      </div>
      <div className="Login_h1">
        <h1>Titan Capital Financial</h1>
      </div>
      <div
        id="validation"
        style={{ display: showValidation ? "block" : "none" }}
      >
        <p>Invalid Credentials</p>
      </div>
      <div className="Login__form">
        <form onSubmit={handleLogin}>
          <div className="animated-text">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="animated-text">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="login__form-submit">
            <button
              className="login__form-submit-button"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
