import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function ConsoleLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
