import { useState, useEffect } from "react";


function Login({ setIsAuth, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  if (!error) return;

  const timer = setTimeout(() => {
    setError("");
  }, 3000);

  return () => clearTimeout(timer);
}, [error]);

  const handleLogin = async () => {

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

      setLoading(true);
      setError("");
      

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return; 
      }
    

      localStorage.setItem("token", data.data.token);
      setIsAuth(true);

    } catch (error) {
      setError("Login failed, try again");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && 
      (<div className="error-box">
        <span className="error-icon">⚠️</span>
        <span>{error}</span>
      </div>)}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? (<><span className="spinner"></span> Logging in...</>):("Login")}
      </button>
      <p> Don't have an account?{" "}  
        <a href="#"onClick={(e) => { e.preventDefault(); setShowRegister(true);}}>
          Register
          </a>
      </p>
    </div>
  );
}

export default Login;