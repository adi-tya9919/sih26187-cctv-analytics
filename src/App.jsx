import { Navigate, Routes, Route } from "react-router-dom";
import ConsoleLayout from "./components/layout/ConsoleLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Alerts from "./pages/Alerts.jsx";
import Cameras from "./pages/Cameras.jsx";
import EventHistory from "./pages/EventHistory.jsx";
import Analytics from "./pages/Analytics.jsx";
import NotFound from "./pages/NotFound.jsx";

function withConsole(page) {
  return (
    <ProtectedRoute>
      <ConsoleLayout>{page}</ConsoleLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={withConsole(<Dashboard />)} />
      <Route path="/alerts" element={withConsole(<Alerts />)} />
      <Route path="/cameras" element={withConsole(<Cameras />)} />
      <Route path="/history" element={withConsole(<EventHistory />)} />
      <Route path="/analytics" element={withConsole(<Analytics />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
