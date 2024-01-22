import "./App.css";

import { useState, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [bankAccount, setBankAccount] = useState({
    id: "",
    owner: "",
    starting_balance: 0,
    balance: 0,
    transactions: [],
  });

  useEffect(() => {
    fetch("http://localhost:4000/bank_account")
      .then((res) => res.json())
      .then((data) => setBankAccount(data));
  }, []);


  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="app">
      {isLoggedIn ? <NavBar logout={logout} /> : <Navigate to="/login" />}
      <Outlet context={{login: login, bankAccount: bankAccount, setBankAccount: setBankAccount}} />
    </div>
  );
}

export default App;
