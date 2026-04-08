function Header({ setIsAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <header className="job-header">
      <h2 className="job-logo">Job Tracker</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;