import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Topbar.css";

export default function Topbar() {
  const { officer, logout } = useAuth();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <span className="topbar__clock mono">
        {now.toLocaleTimeString("en-IN", { hour12: false })}
      </span>

      <div className="topbar__officer">
        <div className="topbar__officer-info">
          <span className="topbar__officer-name">{officer?.name}</span>
          <span className="topbar__officer-post">{officer?.post}</span>
        </div>
        <button className="topbar__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
