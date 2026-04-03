import { useState } from "react";


function Register({ setShowRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]{2,50}$/; 
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }
    if (!validateName(name)) {
      setError("Name must be 2-50 letters and contain only letters");
      setSuccess("");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setSuccess("");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
      );
      setSuccess("");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!data.success) return setError(data.message);

      setSuccess("User created! You can now login");
      setError("");
      setShowRegister(false);
    } catch (error) {
      setError("Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? {" "}
        <a href="#" onClick={() => setShowRegister(false)}>Login</a>
      </p>
    </div>
  );
}

export default Register;