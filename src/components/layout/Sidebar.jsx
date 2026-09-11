import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/alerts", label: "Alerts" },
  { to: "/cameras", label: "Cameras" },
  { to: "/history", label: "Event history" },
  { to: "/analytics", label: "Analytics" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-code">SIH26187</span>
        <span className="sidebar__brand-name">Video Analytics Console</span>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__status">
        <span className="sidebar__status-dot" aria-hidden="true" />
        System monitoring active
      </div>
    </aside>
  );
}
