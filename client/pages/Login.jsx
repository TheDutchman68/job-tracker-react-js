import { useState } from "react";


function Login({ setIsAuth, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

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

    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message);

      localStorage.setItem("token", data.data.token);
      setIsAuth(true);
    } catch (error) {
      setError("Login failed, try again");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-msg">{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
      <p> Don't have an account?{" "}  
        <a href="#"onClick={(e) => { e.preventDefault(); setShowRegister(true);}}>
          Register
          </a>
      </p>
    </div>
  );
}

export default Login;